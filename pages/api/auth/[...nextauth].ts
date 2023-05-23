import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthOptions } from 'next-auth'
import { verify } from "argon2";

import prisma from "db"
import { Login } from "app/auth/validations"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await Login.parseAsync(credentials);

          const result = await prisma.user.findFirstOrThrow({
            where: { email },
            select: { hashedPassword: true, id: true }
          });

          const isValidPassword = await verify(result.hashedPassword, password);

          if (!isValidPassword) throw new Error("Check email and/or password")

          return { id: result.id, email, };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("USER", user)
      console.log("TOKEN", token)
      if (user) {
        token.userId = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      console.log("SESSION", session)
      console.log("TOKEN", token)
      if (token) {
        session.user.id = token.userId;
        session.user.email = token.email;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  secret: "super-secret",
}

export default NextAuth(authOptions)