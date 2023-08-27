import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (label: string) => void;
};

export default function CategoryItem({
  icon: Icon,
  label,
  selected,
  onClick,
}: Props) {
  return (
    <div
      className={`inset-0 rounded-lg border-2
            flex gap-3 items-center p-4
            transition hover:border-black cursor-pointer
            ${selected ? "border-black" : "border-neutral-200"}
            `}
      onClick={() => {
        onClick(label);
      }}
    >
      <Icon className={`w-7 h-7 transition`} />
      <span className="font-semibold">{label}</span>
    </div>
  );
}
