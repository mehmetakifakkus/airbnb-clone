import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";

const prisma = new PrismaClient();

export async function POST(req: Request) {

  const body = await req.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 15);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}