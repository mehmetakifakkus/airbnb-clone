"use client";

import { Listing, User } from "@prisma/client";

import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

type Props = {
  favorites: Listing[];
  currentUser?: User | null;
};

export default function FavoritesClient({ favorites, currentUser }: Props) {
  return (
    <Container>
      <div
        className="grid grid-cols-1 gap-8
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {favorites.map((listing) => {
          return (
            <div key={listing.id}>
              <ListingCard listing={listing} currentUser={currentUser} />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
