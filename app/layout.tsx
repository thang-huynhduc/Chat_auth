import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chatbot | Your Intelligent Assistant",
  description: "An advanced AI chatbot to help with your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchInterval={0}
        >
          {children}
        </SessionProvider>
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: { 
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#333',
              fontWeight: 500
            }
          }}
        />
      </body>
    </html>
  );
}