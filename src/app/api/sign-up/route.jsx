import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const saltRounds = 10;
import prisma from "@/lib/prisma";

const main = async (name, email, hash) => {
  const user = await prisma.user.create({
    data: { email, name, hash, joined: new Date() },
  });
  // const login = await prisma.logins.create({
  //   data: { email, hash },
  // });
  return user;
};

export async function POST(req) {
  const { name, email, password } = await req.json();
  const hash = bcrypt.hashSync(password, saltRounds);
  const new_user = await main(name, email, hash)
    .catch((e) => console.error(e.message))
    .finally(async () => await prisma.$disconnect());
  return NextResponse.json(new_user);
}
