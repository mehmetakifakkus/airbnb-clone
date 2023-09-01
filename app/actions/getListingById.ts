import prisma from "@/app/libs/prismadb";

type IParams = {
  listingId?: string;
}

export default async function getListingById(params: IParams) {

  const { listingId } = params;

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId
      }, include: {
        user: true,
      }
    });

    return listing ? listing : null;

  } catch (error: any) {
    throw new Error(error);
  }
}