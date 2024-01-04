import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const updateUserEntries = async (id) => {
  const updeatedEntry = await prisma.users.update({
    where: { id },
    data: {
      entries: { increment: 1 },
    },
  });
  if (updeatedEntry) {
    return updeatedEntry;
  } else {
    return { error: "Naa! Naa! Please sign in to detect faces" };
  }
};

export async function PUT(req) {
  const { id } = await req.json();
  const updated = await updateUserEntries(id)
    .catch((err) => console.error(err.message))
    .finally(async () => await prisma.$disconnect());
  return NextResponse.json(updated);
}
