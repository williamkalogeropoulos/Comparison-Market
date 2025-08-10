import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4">
          {!session ? (
            <div className="text-center bg-white p-8 rounded-lg border shadow-sm">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Not authenticated</h1>
              <p className="text-slate-600">Please log in to view this page.</p>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome</h1>
              <p className="text-slate-700">User ID: {session.userId}</p>
              <p className="text-slate-700">Token: {session.token}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}


