import prisma from "@/app/libs/prismadb";

type Props = {
  userId?: string;
  category?: string;
}

export default async function getListings(params?: Props) {

  // let query: any = {}

  // if (params?.userId)
  //   query.userId = params.userId;

  try {
    const listings = await prisma.listing.findMany({
      where: params,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings;

  } catch (error: any) {
    throw new Error(error);
  }
}