"use client";

import FloatingChatButton from "@/components/FloatingChatButton";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { SessionProvider } from "next-auth/react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col bg-gray-900">
        <Navigation />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <FloatingChatButton />
      </div>
    </SessionProvider>
  );
}
