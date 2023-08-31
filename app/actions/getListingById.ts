import prisma from "@/app/libs/prismadb";

export default async function getListingById(id: string) {

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: id
      }, include: {
        user: true,
      }
    });

    return listing ? listing : null;

  } catch (error: any) {
    throw new Error(error);
  }
}