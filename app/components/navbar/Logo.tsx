"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();
  return (
    <Image
      src="/images/logo.png"
      alt="airbnb logo"
      width={100}
      height={100}
      className="hidden md:block cursor-pointer filter hover:brightness-150 transition duration-150 ease-in-out"
      onClick={() => {
        router.push("/");
      }}
    />
  );
}

export default Logo;
