import axios from "axios";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/login`, {
            username: credentials.username,
            password: credentials.password,
          });

          const data = res.data;
          console.log("Authorize data:", data); // Gỡ lỗi
          if (data.code === 200) {
            return {
              id: data.account.id,
              username: data.account.username,
              email: data.account.email,
              accessToken: data.tokens.accessToken,
              refreshToken: data.tokens.refreshToken,
              apiKeyAIService: data.apiKeyAIService,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
]
} satisfies NextAuthConfig;