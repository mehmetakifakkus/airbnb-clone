import React from "react";
import TripsClient from "./TripsClient";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <EmptyState
        title="Access denied"
        subtitle="You need to login to access this page"
        showLogin
      />
    );

  const reservations = await getReservations({ userId: currentUser?.id });

  if (reservations.length === 0)
    return <EmptyState title="No Trips" subtitle="You have no trips booked" />;

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
