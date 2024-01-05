import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const main = async (email, password) => {
  const person = await prisma.user.findUnique({
    where: { email },
  });

  if (person.id) {
    const hashed = bcrypt.compareSync(password, person.hash);
    if (hashed) {
      const { name, email, entries, id } = person;
      return { name, email, entries, id };
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
