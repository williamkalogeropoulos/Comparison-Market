"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TestAuthClient() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testEmail, setTestEmail] = useState("test@example.com");
  const [testPassword, setTestPassword] = useState("password123");
  const [testName, setTestName] = useState("Test User");
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setMessage("");
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, password: testPassword, name: testName }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registration successful! User created.");
        await checkAuth();
      } else {
        setMessage(`❌ Registration failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Registration error: ${error}`);
    }
  };

  const testLogin = async () => {
    setMessage("");
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, password: testPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Login successful!");
        await checkAuth();
      } else {
        setMessage(`❌ Login failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Login error: ${error}`);
    }
  };

  const testLogout = async () => {
    setMessage("");
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setMessage("✅ Logout successful!");
        setUser(null);
      } else {
        setMessage("❌ Logout failed");
      }
    } catch (error) {
      setMessage(`❌ Logout error: ${error}`);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Authentication Status</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="space-y-2">
              <p><strong>✅ Logged in as:</strong></p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>ID: {user.id}</p>
            </div>
          ) : (
            <p><strong>❌ Not logged in</strong></p>
          )}
        </CardContent>
      </Card>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Test Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input 
                value={testName} 
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Test User"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input 
                value={testEmail} 
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input 
                type="password"
                value={testPassword} 
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="password123"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={testRegister}>Test Register</Button>
            <Button onClick={testLogin} variant="outline">Test Login</Button>
            {user && <Button onClick={testLogout} variant="destructive">Test Logout</Button>}
          </div>

          {message && (
            <div className={`p-3 rounded-md ${
              message.includes('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 
              message.includes('❌') ? 'bg-red-50 text-red-800 border border-red-200' : 
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {message}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>1. <strong>Register:</strong> Create a new account with the test credentials</p>
          <p>2. <strong>Login:</strong> Sign in with the same credentials</p>
          <p>3. <strong>Check Status:</strong> Verify the user info appears above</p>
          <p>4. <strong>Logout:</strong> Sign out and verify the status changes</p>
          <p>5. <strong>Navigation:</strong> Check that the navbar shows the correct login state</p>
        </CardContent>
      </Card>
    </div>
  );
}
