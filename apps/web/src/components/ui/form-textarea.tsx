import { ComponentPropsWithoutRef } from "react";
import { Textarea } from "./textarea";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";

interface FormTextareaProps<T extends string = string> extends Omit<
  ComponentPropsWithoutRef<typeof Textarea>,
  "placeholder"
> {
  control: Control<any>;
  name: T;
  lable: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormTextarea<T extends string = string>({
  control,
  name,
  lable,
  placeholder,
  required = true,
  ...textareaProps
}: FormTextareaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="font-funnel-sans text-sm font-medium text-zinc-300">
            {lable} {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>

          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              {...textareaProps}
              className="
                h-40
                max-h-52
                mt-1.5
                rounded
                bg-zinc-900/70
                border border-zinc-700
                text-zinc-200
                placeholder:text-zinc-500!
                backdrop-blur-sm!


                focus:border-purple-400/40!
                focus:outline-purple-400/40!
                // focus:ring-2!
                focus:ring-neutral-400/20!

                transition-all
                duration-200
              "
            />
          </FormControl>
          <FormMessage className="text-red-400 text-xs" /> {/* ✅ Add karo */}
        </FormItem>
      )}
    />
  );
}
