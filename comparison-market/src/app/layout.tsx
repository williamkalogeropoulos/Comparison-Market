import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { Background } from "@/components/background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comparison Market - Smart Price Comparison & Shopping",
  description: "Find the best deals, track price history, and compare products across multiple retailers. Save money with intelligent shopping insights.",
  keywords: "price comparison, shopping deals, price tracking, product reviews, online shopping",
  authors: [{ name: "Comparison Market" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ToastProvider>
          <Background />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
