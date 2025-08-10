"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";

export function WelcomeMessage() {
  const [userName, setUserName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const hasSession = document.cookie.includes("session=");
    console.log("WelcomeMessage - Session cookie found:", hasSession);
    if (hasSession) {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
          console.log("WelcomeMessage - Auth /me response:", data);
          if (data.user) {
            setUserName(data.user.name || data.user.email.split('@')[0]);
            setIsVisible(true);
          }
        })
        .catch((error) => {
          console.error("WelcomeMessage - Auth /me error:", error);
          // If /me fails, don't show welcome message
        });
    }
  }, []);

  if (!isVisible || !userName) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-md mx-4">
      <div className="flex items-center gap-3">
        <CheckCircle className="text-green-600 size-5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">
            Welcome back, {userName}! 👋
          </p>
          <p className="text-xs text-green-600 mt-1">
            You're successfully logged in to CompareThat.com
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-green-400 hover:text-green-600 transition"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
