"use client";

import Avatar from "@/app/components/Avatar";
import { Category, categories } from "@/app/components/navbar/Categories";
import { pluralize } from "@/app/libs/plularize";
import { Listing, User } from "@prisma/client";
import React, { useMemo } from "react";
import ListingCategory from "./ListingCategory";
import Map from "@/app/components/Map";
import useCountries from "@/app/hooks/useCountries";

type Props = {
  listing: Listing;
  currentUser?: User | null;
};

export default function ListingInfo({
  listing: {
    bathroomCount,
    roomCount,
    guestCount,
    description,
    locationValue,
    category,
  },
  currentUser,
}: Props) {
  const categoryObj = useMemo(
    () => categories.find((item) => item.label === category),
    [category]
  );
  const { getByValue } = useCountries();
  const coordinate = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="text-xl font-semibold">
            Hosted by {currentUser?.name}
          </div>
          <Avatar imageSrc={currentUser?.image} />
        </div>
        <div className="flex gap-4 text-neutral-500 font-light">
          <div>{pluralize(guestCount, "guest")}</div>
          <div>{pluralize(roomCount, "room")}</div>
          <div>{pluralize(bathroomCount, "bathroom")}</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory category={categoryObj as Category} />}
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <div className="">
        <Map center={coordinate} />
      </div>
    </div>
  );
}
