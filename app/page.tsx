import { auth } from "@/auth";
import HeaderHome from "@/components/Homepage/Header";
import NavBarHome from "@/components/Homepage/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Sparkles, Shield } from "lucide-react";

export default async function Home() {
  const session = await auth();
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 text-white">
      {/* Navbar */}
      <NavBarHome session={session}/>
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
        </div>
        
        {/* Hero content */}
        <HeaderHome session={session} />
        
        {/* Feature section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
            <div className="bg-indigo-500/20 p-3 rounded-lg w-fit mb-4">
              <MessageSquare className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Intelligent Conversations</h3>
            <p className="text-slate-300">Experience natural, flowing conversations with advanced language understanding.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-4">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Creative Assistant</h3>
            <p className="text-slate-300">Get help with writing, brainstorming, coding, or any creative task.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
            <div className="bg-emerald-500/20 p-3 rounded-lg w-fit mb-4">
              <Shield className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-slate-300">Your conversations are protected with enterprise-grade security.</p>
          </div>
        </div>
        
        {/* CTA Section */}
        {!session && (
          <div className="mt-20 text-center">
            <div className="inline-flex space-x-4">
            <Link href="/auth/login">
              <Button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 rounded-full text-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/auth/register">
              <Button
                variant="outline"
                className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 py-6 rounded-full text-lg backdrop-blur-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Sign Up Free
              </Button>
            </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}