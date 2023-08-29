"use client";

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
  title: string;
  subtitle: string;
  value?: number;
  onChange: (value: number) => void;
};

export default function Counter({
  title,
  subtitle,
  value = 0,
  onChange,
}: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        <span className="font-light text-neutral-600">{subtitle}</span>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <AiOutlineMinusCircle
          size={32}
          className="cursor-pointer text-neutral-500 hover:text-neutral-900 select-none"
          onClick={() => {
            if (value === 1) return;
            onChange(value - 1);
          }}
        />
        <span className="text-3xl select-none">{value}</span>
        <AiOutlinePlusCircle
          size={32}
          className="cursor-pointer text-neutral-500 hover:text-neutral-900 select-none"
          onClick={() => {
            onChange(value + 1);
          }}
        />
      </div>
    </div>
  );
}
