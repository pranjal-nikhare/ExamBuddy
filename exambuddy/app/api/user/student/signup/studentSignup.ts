import { NextRequest, NextResponse } from "next/server";
import zod from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const schema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
  });

  const validate = schema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json({ message: "Invalid inputs" }, { status: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await client.student.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    console.log(user.id);
    return NextResponse.json({ message: "Account created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while creating the account" },
      { status: 500 }
    );
  } finally {
    await client.$disconnect();
  }
}
