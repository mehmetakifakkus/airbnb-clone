"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../navbar/Heading";
import { toast } from "react-hot-toast";

import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../navbar/Categories";
import CategoryItem from "../inputs/CategoryItem";
import { FieldValues, useForm } from "react-hook-form";

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
      price: 1,
      title: "",
      description: "",
    },
  });

  const selectedCategory = watch("category");

  const setCustomValue = (
    id: string,
    value: string | number | boolean | null | undefined
  ) => {
    setValue(id, value, { shouldValidate: true });
  };

  const onNext = () => {
    if (step === STEPS.PRICE) return;

    setStep((prev) => prev + 1);
  };

  const onBack = () => {
    if (step === STEPS.CATEGORY) return;

    setStep((prev) => prev - 1);
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
        <div className="grid md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"></div>
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
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryAction={onBack}
      secondaryActionLabel={secondaryActionLabel}
      footer={<></>}
    />
  );
}
