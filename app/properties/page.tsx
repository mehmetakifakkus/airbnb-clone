import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

export default async function propertiesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyState
        title="Access denied"
        subtitle="You need to login to access this page"
        showLogin
      />
    );

  const properties = await getListings({
    userId: currentUser?.id,
  });

  if (properties.length === 0)
    return (
      <EmptyState
        title="No Properties"
        subtitle="You have no properties yet, create one!"
      />
    );

  return <PropertiesClient currentUser={currentUser} properties={properties} />;
}
