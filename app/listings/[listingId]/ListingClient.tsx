import Container from "@/app/components/Container";
import React from "react";
import ListingHeader from "./ListingHeader";
import ListingInfo from "./ListingInfo";
import { Listing, User } from "@prisma/client";

type Props = {
  listing: Listing;
  currentUser: User | null;
};

export default function ListingClient({ listing, currentUser }: Props) {
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
          </div>
        </div>
      </div>
    </Container>
  );
}
