"use client";

import Image from "next/image";
import React from "react";

type Props = {
  imageSrc: string | null | undefined;
};

export default function Avatar({ imageSrc }: Props) {
  return (
    <Image
      className="rounded-full"
      src={imageSrc || "/images/placeholder.jpg"}
      alt="avatar"
      width={30}
      height={30}
    />
  );
}
