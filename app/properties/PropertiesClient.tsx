import React from "react";

import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import Heading from "../components/navbar/Heading";

type Props = {
  properties: Listing[];
  currentUser?: User | null;
};
export default function PropertiesClient({ properties, currentUser }: Props) {
  return (
    <Container>
      <Heading title="My Properties" subtitle="Properties I belong to" />
      <div
        className="mt-8 grid grid-cols-1 gap-8
      sm:grid-cols-2 
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
    "
      >
        {properties.map((listing) => {
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
