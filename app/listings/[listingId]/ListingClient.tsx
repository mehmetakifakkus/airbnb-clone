import Container from "@/app/components/Container";
import ListingHeader from "./ListingHeader";
import ListingInfo from "./ListingInfo";
import { Listing, Reservation, User } from "@prisma/client";
import ListingReservation from "./ListingReservation";

type Props = {
  listing: Listing;
  currentUser?: User | null;
  reservations: Reservation[];
};

export default function ListingClient({
  listing,
  currentUser,
  reservations = [],
}: Props) {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeader listing={listing} currentUser={currentUser} />
          <div
            className=" mt-6 grid grid-cols-1 
              md:grid-cols-7 md:gap-10"
          >
            <ListingInfo listing={listing} currentUser={currentUser} />
            <ListingReservation
              listing={listing}
              currentUser={currentUser}
              reservations={reservations}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
