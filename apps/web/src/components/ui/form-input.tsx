"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ComponentPropsWithoutRef } from "react";

interface FormInputProps<T extends string = string>
  extends Omit<ComponentPropsWithoutRef<typeof Input>, "name" | "type" | "placeholder"> {
  control: Control<any>;
  name: T;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | string;
  placeholder?: string;
  required?: boolean;
}

export default function FormInput<T extends string = string>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  ...inputProps
}: FormInputProps<T>) {

  const displayLabel =
    label || name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">

          <FormLabel className="font-funnel-sans text-sm font-medium text-zinc-300">
            {displayLabel}
            {required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </FormLabel>

          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || `Enter your ${name.toLowerCase()}`}
              {...field}
              {...inputProps}
              className="
                h-11
                mt-1.5
                rounded
                bg-zinc-900/70
                border border-zinc-700
                text-zinc-200
                placeholder:text-zinc-500
                backdrop-blur-sm

                focus:border-purple-400/40!
                focus:ring-2!
                focus:ring-neutral-400/20!

                transition-all
                duration-200
              "
            />
          </FormControl>

          <FormMessage className="text-xs text-red-400" />

        </FormItem>
      )}
    />
  );
}