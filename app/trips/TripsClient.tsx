"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Listing, Reservation, User } from "@prisma/client";

import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import EmptyState from "../components/EmptyState";
import Heading from "../components/navbar/Heading";

type ReservationExtented = Reservation & {
  listing: Listing;
};

type Props = { reservations: ReservationExtented[]; currentUser?: User | null };

export default function TripsClient({ reservations, currentUser }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteReservation = useCallback(
    (reservationId: string) => {
      setIsLoading(true);
      axios
        .delete(`api/reservations/${reservationId}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error("An error occured");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setIsLoading, router]
  );

  return (
    <Container>
      <Heading
        title="My Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="mt-8 grid grid-cols-1 gap-8
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {reservations.map((reservation) => {
          return (
            <div key={reservation.id}>
              <ListingCard
                currentUser={currentUser}
                reservation={reservation}
                listing={reservation.listing}
                onAction={onDeleteReservation}
                actionId={reservation.id}
                actionLabel="Cancel My Reservation"
                disabled={isLoading}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
