import { cn } from "@/lib/utils";

export default function Background({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "min-h-screen fixed top-0 left-0 w-full h-screen overflow-hidden bg-linear-to-tl from-[#150c25] via-indigo-700/40 to-[#090510] pointer-events-none",
        className
      )}
    />
  );
}


    // <div
    //   className={cn(
    //     "min-h-screen fixed top-0 left-0 w-full h-screen overflow-hidden bg-linear-to-tl from-[#000000] via-[#07032d] to-[#000000]  pointer-events-none",
    //     className
    //   )}
    // >
    //   {/* Purple glow */}
    //   <div
    //     className="absolute top-1/4 left-1/3 -translate-y-1/4 -translate-x-1/2
    //     w-200 h-220 bg-[#6f58df]/70 blur-[110px] rounded-full rotate-45"
    //   />

    //   {/* Pink glow */}
    //   <div
    //     className="absolute top-1/12 right-0
    //     w-250 h-200 bg-pink-500/70 blur-[100px] rounded-full -rotate-45"
    //   />

    //   {/* Blue glow */}
    //   <div
    //     className="absolute bottom-0 right-1/4
    //     w-300 h-200 bg-[#4f46e5]/40 blur-[120px] rounded-full"
    //   />
    // </div>