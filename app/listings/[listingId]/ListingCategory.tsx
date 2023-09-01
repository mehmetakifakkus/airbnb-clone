"use client";

import { Category } from "@/app/components/navbar/Categories";
import React from "react";

type Props = {
  category: Category;
};

export default function ListingCategory({
  category: { icon: Icon, label, description: categoryDescription },
}: Props) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <Icon size={44} className="text-neutral-600" />
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-neutral-500 font-light">{categoryDescription}</div>
      </div>
    </div>
  );
}
