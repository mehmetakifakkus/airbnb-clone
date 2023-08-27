"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import qs from "query-string";

type Props = {
  label: string;
  icon: IconType;
  selected?: boolean;
};

export default function CategoryBox({ label, icon: Icon, selected }: Props) {
  const params = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    const query = qs.parse(params?.toString() || "");

    const newQuery = {
      ...query,
      category: label as any,
    };

    if (label === params?.get("category")) {
      delete newQuery.category;
    }

    const newQueryString = qs.stringifyUrl(
      { url: "/", query: newQuery },
      { skipNull: true }
    );
    router.push(newQueryString);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 
                  hover:text-neutral-800 cursor-pointer transition 
                  ${selected ? "border-neutral-800" : "border-transparent"}
                  ${selected ? "text-neutral-800" : "text-neutral-500"}
                `}
      onClick={handleClick}
    >
      <Icon size={24} />
      {label}
    </div>
  );
}
