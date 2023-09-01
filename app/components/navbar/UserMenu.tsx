"use client";

import React, { useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import useRegisterStore from "@/app/hooks/useRegisterModal";
import useLoginStore from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

type Props = {};

export default function UserMenu({}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { setOpen: setRegisterModalOpen } = useRegisterStore();
  const { setOpen: setLoginModalOpen, isOpen: isLoginModalOpen } =
    useLoginStore();
  const rentModal = useRentModal();
  const router = useRouter();

  const { data: session, status } = useSession();

  const onRent = useCallback(() => {
    if (!session) setLoginModalOpen();
    else rentModal.setOpen();
  }, [rentModal, session, setLoginModalOpen]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden md:block text-sm font-semibold
            py-3 px-4 rounded-full hover:bg-neutral-100
            transition cursor-pointer
            "
        >
          Airbnb your home
        </div>
        <div
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className="
            p-4 md:py-1 md:px-2 border border-neutral-200 
            flex items-center gap-3 rounded-full 
            cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar imageSrc={session?.user?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute w-[32vw] md:w-3/4 top-12 right-0
            text-sm overflow-hidden
            rounded-xl bg-white border border-neutral-200"
        >
          {(status as string) === "authenticated" ? (
            <>
              <MenuItem
                onClick={() => {
                  router.push("/trips");
                }}
              >
                My trips
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/favourites");
                }}
              >
                My favorites
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/reservations");
                }}
              >
                My reservations
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/properties");
                }}
              >
                My properties
              </MenuItem>
              <MenuItem onClick={rentModal.setOpen}>Airbnb my home</MenuItem>
              <hr />
              <MenuItem
                onClick={() => {
                  toast.success("Logged out");
                  setIsOpen(false);
                  signOut({ redirect: true, callbackUrl: "/" });
                }}
              >
                Log out
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  setLoginModalOpen();
                  setIsOpen(false);
                }}
              >
                Login
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setRegisterModalOpen();
                  setIsOpen(false);
                }}
              >
                Sign Up
              </MenuItem>
            </>
          )}
        </div>
      )}
    </div>
  );
}
