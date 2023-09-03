import React from "react";
import ReservationClient from "./ReservationClient";
import Container from "../components/Container";
import getReservations from "../actions/getReservations";
import getCurrentUser from "../actions/getCurrentUser";

type Props = {};

export default async function page({}: Props) {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  return (
    <Container>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Container>
  );
}
