import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Use a type guard to ensure credentials is not undefined
        if (!credentials) {
          throw new Error("Credentials are required");
        }

        const { email, password } = credentials;

        // Check if the user exists in your database
        const user = await prisma.student.findUnique({ where: { email } });

        if (!user) {
          throw new Error("No user found with this email address");
        }

        // Validate the password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
});
