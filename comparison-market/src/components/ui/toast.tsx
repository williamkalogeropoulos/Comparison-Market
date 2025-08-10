"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextValue {
  show: (opts: { type?: ToastType; title?: string; message: string }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const show = useCallback(({ type = "info", title, message }: { type?: ToastType; title?: string; message: string }) => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = { id, type, title, message };
    setItems((prev) => [...prev, item]);
    // Auto dismiss
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed z-[100] top-4 right-4 space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`min-w-[240px] max-w-[360px] rounded-md shadow-lg px-4 py-3 text-sm backdrop-blur bg-white/90 border ${
              t.type === "success"
                ? "border-green-200"
                : t.type === "error"
                ? "border-red-200"
                : "border-gray-200"
            }`}
          >
            {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
            <div className="text-gray-700">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}


