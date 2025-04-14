import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/lib/api';

export default {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorize called with credentials:', credentials);

        if (typeof credentials?.username !== 'string' || typeof credentials?.password !== 'string') {
          console.error('Missing or invalid credentials:', credentials);
          return null;
        }

        try {
          const response = await login(credentials.username, credentials.password);
          console.log('Authorize login response:', response);

          if (response.success && response.data?.code === 200) {
            const data = response.data;
            const user = {
              id: data.account.id,
              username: data.account.username,
              email: data.account.email,
              accessToken: data.tokens.accessToken,
              refreshToken: data.tokens.refreshToken,
              apiKeyAIService: '', // Placeholder
            };
            console.log('Authorize returning user:', user);
            return user;
          } else {
            console.error('Login failed:', response.error);
            return null;
          }
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;