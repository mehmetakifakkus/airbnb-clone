"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import moment from "moment";

import { Listing, Reservation, User } from "@prisma/client";
import HeartButton from "./HeartButton";
import Button from "../Button";

import useCountries from "@/app/hooks/useCountries";

type Props = {
  listing: Listing;
  currentUser?: User | null;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  actionId?: string;
  actionLabel?: string;
  disabled?: boolean;
};

export default function ListingCard({
  listing,
  currentUser,
  reservation,
  onAction,
  actionId,
  actionLabel,
  disabled,
}: Props) {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(listing.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      if (onAction && actionId) onAction(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (!reservation) return listing.price;
    else return reservation.totalPrice;
  }, [listing.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    else return moment(new Date(reservation.startDate)).format("MMM DD, YYYY");
  }, [reservation]);

  return (
    <div
      onClick={() => {
        router.push(`/listings/${listing.id}`);
      }}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={listing.imageSrc}
            alt={listing.description}
            className="
              object-cover h-full w-full
              group-hover:scale-110 transition 
            "
            width={500}
            height={500}
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={listing.id}
              currentUser={currentUser as User}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || listing.category}
        </div>
        <div className="flex gap-1 items-center">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {actionId && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
