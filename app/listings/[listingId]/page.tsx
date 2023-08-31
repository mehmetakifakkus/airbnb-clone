import getListingById from "@/app/actions/getListingById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingHeader from "./ListingHeader";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingInfo from "./ListingInfo";
import ListingClient from "./ListingClient";

type Props = {
  params: { listingId: string };
};

export default async function ListingPage({ params: { listingId } }: Props) {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(listingId);

  if (!listing) return <EmptyState showReset />;

  return <ListingClient listing={listing} currentUser={currentUser} />;
}
