"use client";

import Heading from "./navbar/Heading";
import Button from "./Button";
import { useRouter } from "next/navigation";
import useLoginModal from "../hooks/useLoginModal";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
};

export default function EmptyState({
  title = "No exact matches found",
  subtitle = "You can add new listings to view here!",
  showReset,
  showLogin,
}: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();

  return (
    <div
      className="
        flex flex-col gap-2 items-center justify-center h-[calc(100vh-12rem)]"
    >
      <Heading title={title} subtitle={subtitle} center />
      {showReset && (
        <div className="mt-4 w-48">
          <Button
            label="Remove all filters"
            outline
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      )}
      {showLogin && (
        <div className="mt-4 w-48">
          <Button label="Login" onClick={loginModal.setOpen} />
        </div>
      )}
    </div>
  );
}
