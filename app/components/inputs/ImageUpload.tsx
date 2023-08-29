"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="pvukq7r2"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
          e.preventDefault();
          open();
        }
        return (
          <>
            {value ? (
              <div>
                <Image
                  src={value}
                  height={400}
                  width={600}
                  alt="Uploaded image"
                  className="rounded"
                  onClick={handleOnClick}
                />
              </div>
            ) : (
              <div
                className="flex flex-col gap-1 justify-center items-center 
              border-dashed border-2 border-neutral-500 inset-0 rounded-lg p-20
              text-neutral-600
              cursor-pointer hover:opacity-70 transition"
                onClick={handleOnClick}
              >
                <TbPhotoPlus size="40" className="" />
                <span className="text-lg font-semibold">Click to Upload</span>
              </div>
            )}
          </>
        );
      }}
    </CldUploadWidget>
  );
}
