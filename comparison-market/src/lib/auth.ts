import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "file:./dev.db",
    },
  },
});
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");
const SESSION_COOKIE = "session";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createUser(email: string, password: string, name?: string) {
  const passwordHash = await hashPassword(password);
  return prisma.user.create({ data: { email, passwordHash, name } });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createSession(userId: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
  await prisma.session.create({ data: { userId, token, expiresAt } });

  const jwt = await new SignJWT({ token })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  const store = await cookies();
  store.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function getSession() {
  const store = await cookies();
  const cookie = store.get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, JWT_SECRET);
    const token = (payload as any).token as string;
    const session = await prisma.session.findUnique({ where: { token }, include: { user: true } });
    if (!session || session.expiresAt < new Date()) return null;
    return session;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const store = await cookies();
  const cookie = store.get(SESSION_COOKIE)?.value;
  if (cookie) {
    try {
      const { payload } = await jwtVerify(cookie, JWT_SECRET);
      const token = (payload as any).token as string;
      await prisma.session.delete({ where: { token } }).catch(() => {});
    } catch {}
  }
  store.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}


