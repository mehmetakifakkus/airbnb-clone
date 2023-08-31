"use client";

import getCurrentUser from "@/app/actions/getCurrentUser";
import HeartButton from "@/app/components/listings/HeartButton";
import useCountries from "@/app/hooks/useCountries";
import { Listing, User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  listing: Listing;
  currentUser: User | null;
};

export default function ListingHeader({
  listing: { id, title, locationValue, imageSrc },
  currentUser,
}: Props) {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="text-light text-neutral-500">
          {location?.region}, {location?.label}
        </div>
      </div>
      <div className="w-full h-[50vh] rounded-xl overflow-hidden relative">
        <Image
          fill
          src={imageSrc as string}
          alt={`Image of ${title as string}`}
          className="object-cover"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser as User} />
        </div>
      </div>
    </div>
  );
}
