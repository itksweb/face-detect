import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const main = async (email, password) => {
  const user = await prisma.logins.findUnique({
    where: { email },
  });

  if (user) {
    const hashed = bcrypt.compareSync(password, user.hash);
    if (hashed) {
      const profile = await prisma.users.findUnique({
        where: { email },
      });
      return profile;
    } else {
      return "wrong email/password";
    }
  } else {
    return "This account does not exist in our database";
  }
};

export async function POST(req) {
  const { email, password } = await req.json();
  const profile = await main(email, password)
    .catch((e) => console.error(e.message))
    .finally(async () => await prisma.$disconnect());
  return NextResponse.json(profile);
}
