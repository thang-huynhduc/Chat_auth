/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { User as DefaultUser } from "next-auth";

// Mô tả account object từ API
export interface APIAccount {
  id: string;
  username: string;
  email: string;
}

// Mô tả tokens từ API
export interface APITokens {
  accessToken: string;
  refreshToken: string;
}

// Mở rộng "next-auth" module
declare module "next-auth" {
  interface Session {
    user: APIAccount & {
      apiKeyAIService: string;
    };
    tokens: APITokens;
  }
  interface User extends DefaultUser {
    username?: string;
    id: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;
    apiKeyAIService: string;
  }
}

// Mở rộng "next-auth/jwt" module
declare module "next-auth/jwt" {
  interface JWT extends APIAccount {
    accessToken: string;
    refreshToken: string;
    apiKeyAIService: string;
  }
}
