import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    const user = await createUser(email, password, name);
    await createSession(user.id);
    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch (e: any) {
    // Surface Prisma unique constraint or general error messages to help debugging
    const code = e?.code || "";
    if (code === "P2002") {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    const message = e?.message || "Registration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


