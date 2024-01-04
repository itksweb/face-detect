import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const getProfileById = async (id) => {
  return await prisma.users.findUnique({
    where: { id },
  });
};

export async function PUT(req) {
  const { id } = await req.params.json();
  const profile = await getProfileById(id)
    .catch((err) => console.error(err.message))
    .finally(async () => await prisma.$disconnect());
  return NextResponse.json(profile);
}
