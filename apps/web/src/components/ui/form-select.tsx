import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface FormSelectProps {
  control: Control<any>;
  name: string;
  lable: string;
  options: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
}

export default function FormSelect({
  control,
  name,
  lable,
  options,
  required = true,
  placeholder = "Select an option",
}: FormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="font-funnel-sans text-sm font-medium text-zinc-300">
            {lable} {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>

          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className="
                  rounded
                  bg-zinc-900/70
                  border border-zinc-700
                  text-zinc-200
                  focus:border-purple-400/40!
                  focus:ring-2!
                  focus:ring-neutral-400/20!
                  transition-all duration-200
                "
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-200">
              {options.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="focus:bg-zinc-800 focus:text-zinc-100"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage className="text-red-400 text-xs" /> {/* ✅ Add karo */}
        </FormItem>
      )}
    />
  );
}