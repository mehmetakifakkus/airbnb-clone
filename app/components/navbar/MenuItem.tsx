"use client";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function MenuItem({ children, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 cursor-pointer hover:bg-neutral-100 transition font-semibold"
    >
      {children}
    </div>
  );
}
