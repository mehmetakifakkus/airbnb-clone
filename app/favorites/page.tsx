import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import getListingById from "../actions/getListingById";
import EmptyState from "../components/EmptyState";

export default async function favoritesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyState
        title="Access denied"
        subtitle="You need to login to access this page"
        showLogin
      />
    );

  const favorites = await getListingById({
    listingIds: currentUser?.favoriteIds,
  });

  if (favorites.length === 0)
    return (
      <EmptyState title="No favorites" subtitle="You have no favorites " />
    );

  return <FavoritesClient currentUser={currentUser} favorites={favorites} />;
}
