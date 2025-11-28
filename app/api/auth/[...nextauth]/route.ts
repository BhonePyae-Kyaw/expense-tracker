import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import prisma from "../../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "demo",
      name: "Demo Account",
      credentials: {},
      async authorize() {
        // Find or create the demo user
        const demoUser = await prisma.user.upsert({
          where: { email: "demo@expensetracker.com" },
          update: {},
          create: {
            email: "demo@expensetracker.com",
            name: "Demo User",
            image: null,
          },
        });

        return {
          id: demoUser.id,
          email: demoUser.email!,
          name: demoUser.name,
          image: demoUser.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Save user id to token on sign in
      if (user) {
        token.id = user.id;

        // For OAuth providers, also store in database
        if (account && account.provider !== "demo") {
          // This will be handled by the adapter
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
