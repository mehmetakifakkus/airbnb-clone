"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import React from "react";
import Modal from "./Modal";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Heading from "../navbar/Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";

type Props = {};

export default function RegisterModal({}: Props) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then((res) => {
        toast.success("Account created");
        registerModal.setClose();
        loginModal.setOpen();
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const bodyContent = (
    <div className="flex flex-col gap-4 w-full">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const toggleModal = () => {
    registerModal.setClose();
    loginModal.setOpen();
  };

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          signIn("github");
        }}
      />
      <div className="flex gap-2 justify-center mt-2">
        <span className="text-neutral-500">Already have an account? </span>
        <span
          className="underline cursor-pointer text-neutral-800"
          onClick={toggleModal}
        >
          Log in
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      onClose={registerModal.setClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
