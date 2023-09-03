import React from "react";
import ReservationClient from "./ReservationClient";
import Container from "../components/Container";
import getReservations from "../actions/getReservations";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";

type Props = {};

export default async function page({}: Props) {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No Reservations"
        subtitle="You have no reservations booked to your belongings"
      />
    );

  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
}
