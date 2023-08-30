"use client";

import Heading from "./navbar/Heading";
import Button from "./Button";
import { useRouter } from "next/navigation";

type Props = { title?: string; subtitle?: string; showReset: boolean };

export default function EmptyState({
  title = "No exact matches found",
  subtitle = "You can add new listings to view here!",
  showReset,
}: Props) {
  const router = useRouter();

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
    </div>
  );
}
