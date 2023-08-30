import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import { User } from "@prisma/client";
import useLoginModal from "./useLoginModal";

export function useFavorites(currentUser: User, listingId: string) {

  const { setOpen } = useLoginModal();
  const router = useRouter();

  const favorited = useMemo(() => {
    return currentUser?.favoriteIds?.includes(listingId);
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(async () => {

    if (!currentUser) {
      return setOpen();
    }

    try {
      if (favorited) {
        await axios.delete(`/api/favorites/${listingId}`);
      } else {
        await axios.post(`/api/favorites/${listingId}`);
      }
      router.refresh();
      toast.success(`Listing ${favorited ? 'unfavorited!' : 'favorited!'}`);
    } catch (e) {
      toast.error('Something went wrong!');
    }
  }, [favorited, listingId, currentUser, router, setOpen])

  return { favorited, toggleFavorite }
}