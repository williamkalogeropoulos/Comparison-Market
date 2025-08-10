import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TestAuthClient } from "./test-auth-client";

export default function TestAuthPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Authentication Test</h1>
          <TestAuthClient />
        </div>
      </div>
      <Footer />
    </div>
  );
}
