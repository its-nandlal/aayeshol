"use client";

import { useState } from "react";
import Logo from "@/../public/logo.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import PrimaryButton from "@/components/ui/primary-button";
import { useSignIn, useSignUp } from "../hooks/use-auth";

// Zod schemas import
import {
  signUpUserSchema,
  signInUserSchema,
  SignUpInput,
  SignInInput,
} from "../schemas/auth.schema"; // path adjust कर लो

export default function FormAuth() {
  const [isRegister, setIsRegister] = useState<boolean>(true);

  // Dynamic schema based on mode
  const currentSchema = isRegister ? signUpUserSchema : signInUserSchema;

  const form = useForm<SignUpInput | SignInInput>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword:"",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const signUpMutate = useSignUp();
  const signInMutate = useSignIn();

  const onSubmit = (data: SignUpInput | SignInInput) => {
    // Object से FormData बनाओ (backend FormData expect करता है)
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    if (isRegister) {
      console.log("Registering user with data:", data);
      signUpMutate.mutate(formData);
    } else {
      console.log("Signing in user with data:", data);
      signInMutate.mutate(formData);
    }
  };

  return (
    <div className="w-full h-full py-5 md:py-20 space-y-10 text-neutral-200">
      {/* TOP */}
      <div className="flex flex-col gap-2">
        <Image
          src={Logo}
          alt="aayeshol"
          width={65}
          height={65}
          className="rounded-md"
        />

        <h1 className="text-4xl font-geist-sans font-medium">
          {isRegister ? "Create an account" : "Welcome back"}
        </h1>

        <p className="w-4/5 text-base font-funnel-display tracking-wide text-neutral-500">
          {isRegister
            ? "Create your Aayeshol account to start generating trending AI-powered posts automatically."
            : "Sign in to your Aayeshol dashboard and continue automating your social media content."}
        </p>
      </div>

      {/* FORM */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-4/5 space-y-6">
          {isRegister && (
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Johan"
              />

              <FormInput
                control={form.control}
                name="lastname"
                label="Last Name"
                placeholder="Doe"
              />
            </div>
          )}

          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            type="email"
            autoComplete="email"
          />

          <FormInput
            control={form.control}
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            autoComplete={isRegister ? "new-password" : "current-password"}
          />

          {isRegister && (            
            <FormInput
              control={form.control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              autoComplete="confirmPassword"
            />
          )}

          {/* PrimaryButton disabled handling (prop न हो तो class से) */}
          <PrimaryButton
          type="submit"
            className={form.formState.isSubmitting ? "opacity-70 cursor-wait" : ""}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Processing..."
              : isRegister
              ? "Register"
              : "Login"}
          </PrimaryButton>
        </form>
      </Form>

      {/* BOTTOM SWITCH */}
      <div className="text-center">
        {isRegister ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setIsRegister(false);
                form.reset();
              }}
              className="font-funnel-display underline underline-offset-2 cursor-pointer ml-1 text-purple-400 hover:text-purple-300"
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Don&apos;t have an account?{" "}
            <span
              onClick={() => {
                setIsRegister(true);
                form.reset();
              }}
              className="font-funnel-display underline underline-offset-2 cursor-pointer ml-1 text-purple-400 hover:text-purple-300"
            >
              Register
            </span>
          </p>
        )}
      </div>
    </div>
  );
}