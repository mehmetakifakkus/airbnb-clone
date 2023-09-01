import prisma from "@/app/libs/prismadb";

type IParams = {
  listingId?: string;
  listingIds?: string[];
}

export default async function getListingById(params: IParams) {

  const { listingId, listingIds } = params;

  let query: any = {};
  if (listingIds) {
    query.id = { in: listingIds }
  } else if (listingId) {
    query.id = listingId;
  }

  try {
    const listing = await prisma.listing.findMany({
      where: query,
      include: {
        user: true,
      }
    });

    return listing.length !== 0 ? listing : [];

  } catch (error: any) {
    throw new Error(error);
  }
}