import { cn } from "@/lib/utils";
import { Button } from "./button";

interface PrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
type?: "button" | "submit" | "reset"}

export default function PrimaryButton({
  children,
  className,
  disabled,
  onClick,
  type = "button"
}: PrimaryButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative w-full h-11",
        "border border-slate-200/20 outline-3 outline-black/10",
        "shadow-[0px_0px_10px_1px,inset_0px_0px_20px_2px] shadow-purple-500/70",
        "bg-linear-to-tr from-indigo-700/50 via-purple-500/10 via-5% to-purple-800 to-60%",
        "cursor-pointer overflow-hidden",
        "hover:via-10% hover:to-70% transition-discrete ease-in-out duration-700",
        className,
      )}
    >
      {/* Optional shine effect on hover (modern look) */}
      <span
        className={cn(
          "absolute inset-0 rounded-lg bg-linear-to-r from-purple-500/15 via-white/10 via-50% to-indigo-700/10",
          "opacity-0 hover:opacity-70",
          "duration-300 ease-in-out",
        )}
      />
      {children}
    </Button>
  );
}
