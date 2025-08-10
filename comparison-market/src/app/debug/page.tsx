"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DebugPage() {
  const [cookies, setCookies] = useState("");
  const [authResponse, setAuthResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCookies(document.cookie);
  }, []);

  const testAuth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setAuthResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setAuthResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Debug Authentication</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {cookies || "No cookies found"}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test /api/auth/me</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={testAuth} disabled={loading}>
                  {loading ? "Testing..." : "Test Auth Endpoint"}
                </Button>
                {authResponse && (
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto mt-4">
                    {authResponse}
                  </pre>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>1. Check if cookies are present</p>
                <p>2. Test the auth endpoint</p>
                <p>3. Look at browser console for more debug info</p>
                <p>4. Try logging in at <a href="/login" className="text-blue-600">/login</a></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
