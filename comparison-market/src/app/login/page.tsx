"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Login failed");
      
      // Show success message before redirect
      setError(null);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-8">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Log in</h1>
          <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>}
            {!error && loading && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200">Login successful! Redirecting...</div>}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button disabled={loading} className="w-full">{loading ? "Logging in..." : "Log in"}</Button>
            <p className="text-sm text-slate-600">Don&apos;t have an account? <Link href="/signup" className="text-indigo-700">Sign up</Link></p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}


