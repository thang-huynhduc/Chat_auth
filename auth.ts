import NextAuth from "next-auth"

import authConfig from "@/auth.config"
 
export const { 
  auth,
  handlers,
  signIn,
  signOut 
} = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback user:", user); // Gỡ lỗi
      if (user) {
        token.id = user.id as string;
        token.username = user.username as string;
        token.email = user.email;
        token.accessToken = user.accessToken as string;
        token.refreshToken = user.refreshToken as string;
        token.apiKeyAIService = user.apiKeyAIService;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback token:", token); // Gỡ lỗi
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email  as string;
      session.tokens.accessToken = token.accessToken;
      session.tokens.refreshToken = token.refreshToken;
      session.user.apiKeyAIService = token.apiKeyAIService;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" },
  ...authConfig
})