"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { Range, RangeKeyDict } from "react-date-range";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import useLoginModal from "@/app/hooks/useLoginModal";
import { Listing, Reservation, User } from "@prisma/client";
import Calendar from "@/app/components/inputs/Calendar";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Button from "@/app/components/Button";

type Props = {
  listing: Listing;
  currentUser?: User | null;
  reservations?: Reservation[];
};

export default function ListingReservation({
  listing,
  currentUser,
  reservations = [],
}: Props) {
  const initialDateRange = useMemo(() => {
    return {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
  }, []);

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.setOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        // redirect to trips page
        router.refresh();
        // router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModal,
    initialDateRange,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <div className="order-first mb-10 md:order-last md:col-span-3">
      <div className="border bg-white border-neutral-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-1 p-4">
          <span className="text-2xl font-semibold">$ {listing.price}</span>
          <span className="font-light text-neutral-600">per night</span>
        </div>
        <hr />
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChangeDate={(value: RangeKeyDict) => {
            setDateRange(value.selection);
          }}
        />
        <hr />
        <div className="p-4">
          <Button label="Reserve" onClick={onCreateReservation} />
        </div>
        <hr />
        <div className="flex p-4 items-center justify-between font-semibold text-lg">
          <span>Total</span>
          <span>$ {totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
