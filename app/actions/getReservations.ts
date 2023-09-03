import prisma from "@/app/libs/prismadb";

type IParams = {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {

  const { listingId, userId, authorId } = params;

  if (!listingId && !userId && !authorId) throw new Error('Missing params')

  let query: any = {};

  if (listingId)
    query.listingId = listingId;

  if (userId)
    query.userId = userId

  if (authorId)
    query.listing = { userId: authorId };

  try {
    const listings = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings;

  } catch (error: any) {
    throw new Error(error);
  }
}