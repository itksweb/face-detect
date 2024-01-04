import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const main = async () => {
  return await prisma.users.findMany();
};

export async function GET() {
  const allUsers = await main()
    .catch((e) => console.error({message: e.message}))
    .finally(async () => await prisma.$disconnect());
  return NextResponse.json(allUsers);
}
