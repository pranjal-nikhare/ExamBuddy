import { NextRequest, NextResponse } from "next/server";
import zod from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
  });

  const validate = schema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json({ message: "Invalid inputs" }, { status: 400 });
  }

  try {
    const user = await client.student.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(body.password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // User is authenticated, you can return a success response or generate a token
    return NextResponse.json({ message: "Sign-in successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while signing in" },
      { status: 500 }
    );
  } finally {
    await client.$disconnect();
  }
}
