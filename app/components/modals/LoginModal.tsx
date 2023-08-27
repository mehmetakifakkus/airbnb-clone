"use client";

import React from "react";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler, FieldValues, set } from "react-hook-form";
import Heading from "../navbar/Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

type Props = {};

export default function LoginModal({}: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.setClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggleModal = () => {
    loginModal.setClose();
    registerModal.setOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 w-full">
      <Heading title="Welcome back!" subtitle="Login to your account!" />
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

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {
          signIn("google", {
            callbackUrl: "http://localhost:3000/",
          });
        }}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          signIn("github", {
            callbackUrl: "http://localhost:3000/",
          });
        }}
      />
      <div className="flex gap-2 justify-center mt-2">
        <span className="text-neutral-500">Create an account? </span>
        <span
          className="underline cursor-pointer text-neutral-800"
          onClick={toggleModal}
        >
          Sign up
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.setClose}
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
    />
  );
}
