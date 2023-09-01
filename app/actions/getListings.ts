import prisma from "@/app/libs/prismadb";

export default async function getListings(params?: { userId?: string }) {

  let query: any = {}

  if (params?.userId)
    query.userId = params.userId;

  try {
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings;

  } catch (error: any) {
    throw new Error(error);
  }
}