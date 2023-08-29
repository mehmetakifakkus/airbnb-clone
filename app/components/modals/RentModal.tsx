"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../navbar/Heading";
import { toast } from "react-hot-toast";

import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../navbar/Categories";
import CategoryItem from "../inputs/CategoryItem";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";

type Props = {};

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

export default function RentModal({}: Props) {
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      title: "",
      description: "",
      price: 1,
    },
  });

  const selectedCategory = watch("category");
  const country = watch("country");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const guestCount = watch("guestCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [country]
  );

  const setCustomValue = (
    id: string,
    value: string | number | boolean | null | undefined | CountrySelectValue
  ) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onNext = () => {
    if (step === STEPS.PRICE) return;

    setStep((prev) => prev + 1);
  };

  const onBack = () => {
    if (step === STEPS.CATEGORY) return;

    setStep((prev) => prev - 1);
  };

  const onSubmit = (data: FieldValues) => {
    if (step !== STEPS.PRICE) return onNext();

    console.log(data);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        reset();
        rentModal.setClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8 w-full">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />
      <div className="grid md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((category) => (
          <CategoryItem
            key={category.label}
            {...category}
            selected={selectedCategory === category.label}
            onClick={(label: string) => {
              setCustomValue("category", label);
            }}
          />
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8 w-full">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find your place"
        />
        <CountrySelect
          value={country}
          onChange={(value) => setCustomValue("country", value)}
        />
        <Map center={country?.latlng || [39.6, 32.6]} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8 w-full">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value: number) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value: number) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value: number) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8 w-full">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guessts how your place look like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => {
            setCustomValue("imageSrc", value);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8 w-full">
        <Heading
          title="Describe your place"
          subtitle="Tell guests what your place is like"
        />
        <Input
          id="title"
          label="Title"
          errors={errors}
          register={register}
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          errors={errors}
          register={register}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8 w-full">
        <Heading
          title="Now, the last step!"
          subtitle="Set a price for your place per night!"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          errors={errors}
          register={register}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="flex gap-2 justify-center mt-2">
        <span className="text-neutral-500">Rent rent rent </span>
        <span
          className="underline cursor-pointer text-neutral-800"
          onClick={() => {}}
        >
          Sign up
        </span>
      </div>
    </div>
  );

  const actionLabel = useMemo(() => {
    if (step !== STEPS.PRICE) return "Next";
    else return "Create";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step !== STEPS.CATEGORY) return "Back";
    else return undefined;
  }, [step]);

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Rent a place"
      onClose={() => {
        setStep(STEPS.CATEGORY);
        rentModal.setClose();
      }}
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={onBack}
      secondaryActionLabel={secondaryActionLabel}
      footer={<></>}
    />
  );
}
