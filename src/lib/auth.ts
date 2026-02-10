import 'server-only';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { UserService } from './services/user.service';
import { registerSchema, loginSchema } from './validators/user.validator';

const userService = new UserService();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials);

          const user = await userService.validateCredentials(email, password);
          if (!user) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.avatar_url,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      if (account?.provider === 'github' || account?.provider === 'google') {
        const existingUser = await userService.getByEmail(user.email!);
        if (existingUser) {
          token.id = existingUser.id;
        } else {
          const newUser = await userService.register({
            email: user.email!,
            password: Math.random().toString(36).slice(-8),
            name: user.name || 'User',
          });
          token.id = newUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      console.log(`User signed in: ${user.email} via ${account?.provider}`);
    },
  },
  debug: process.env.NODE_ENV === 'development',
});

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
    };
  }
}
