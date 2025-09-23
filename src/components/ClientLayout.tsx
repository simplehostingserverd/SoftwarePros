"use client";

import { SessionProvider } from "next-auth/react";
import FloatingChatButton from "@/components/FloatingChatButton";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

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
