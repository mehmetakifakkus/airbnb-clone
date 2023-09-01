import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

type Props = {
  params: { listingId: string };
};

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
