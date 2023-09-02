import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

type Props = {
  searchParams: { category?: string };
};

export default async function Home({ searchParams }: Props) {
  const dd = (searchParams: any) => {
    const { category } = searchParams;
  };

  dd(searchParams);

  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) return <EmptyState showReset />;

  return (
    <Container>
      <div
        className="pt-24 grid grid-cols-1 gap-8
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            listing={listing}
          />
        ))}
      </div>
    </Container>
  );
}
