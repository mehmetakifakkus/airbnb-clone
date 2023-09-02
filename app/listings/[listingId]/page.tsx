import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import getListings from "@/app/actions/getListings";
import { Listing } from "@prisma/client";

type Props = {
  params: { listingId: string };
};

export async function generateStaticParams() {
  const listings = await getListings();

  return listings.map((listing: Listing) => ({
    listingId: listing.id,
  }));
}

export default async function ListingPage({ params }: Props) {
  const currentUser = await getCurrentUser();

  const [listing] = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) return <EmptyState showReset />;

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
