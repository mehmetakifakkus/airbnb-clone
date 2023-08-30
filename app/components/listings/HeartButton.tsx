"use client";

import { useFavorites } from "@/app/hooks/useFavorites";
import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";

type Props = {
  listingId: string;
  currentUser?: User;
};

export default function HeartButton({ listingId, currentUser }: Props) {
  const { favorited, toggleFavorite } = useFavorites(
    currentUser as User,
    listingId
  );

  const { setOpen } = useLoginModal();

  return (
    <div
      className="relative cursor-pointer hover:opacity-80 transition"
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite();
      }}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -left-[2px]"
      />
      <AiFillHeart
        size={24}
        className={` ${favorited ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
}
