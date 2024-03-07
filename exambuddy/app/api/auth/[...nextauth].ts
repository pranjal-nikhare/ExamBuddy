// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials, req) {
        const { email, password, role } = credentials as {
          email: string;
          password: string;
          role: string;
        };

        let user;
        if (role === "student") {
          user = await prisma.student.findUnique({
            where: { email },
          });
        } else if (role === "teacher") {
          user = await prisma.teacher.findUnique({
            where: { email },
          });
        }

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isValidPassword = password === user.password;
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = "student";
        if (user.constructor.name === "Teacher") {
          token.role = "teacher";
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
