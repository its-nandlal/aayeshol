// import { cn } from "@/lib/utils";

// export default function Background({className}: {className?: string}) {
//   return (
//     <div className={cn(
//   "min-h-screen relative overflow-hidden bg-linear-to-tl from-[#0c0c1f] via-[#04021c] to-[#01011f]",
//   className
// )}>
//       <div
//         className="absolute top-1/3 left-1/3 -translate-y-1/3 -translate-x-1/2 w-1/2 h-1/2
//          bg-[#6f58df]/90 blur-[100px] rounded-full -rotate-12"
//       />
//       <div className="absolute top-1/5 left-1/2 w-1/2 h-1/2
//          bg-[#c73fda]/90 blur-[100px] rotate-45 rounded-full"/>
//     </div>
//   );
// }


import { cn } from "@/lib/utils";

export default function Background({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "min-h-screen fixed top-0 left-0 w-full h-screen overflow-hidden bg-linear-to-tl from-[#000000] via-[#07032d] to-[#000000] pointer-events-none",
        className
      )}
    >
      {/* Purple glow */}
      <div
        className="absolute top-1/3 left-1/3 -translate-y-1/3 -translate-x-1/2
        w-150 h-180 bg-[#6f58df]/60 blur-[110px] rounded-full rotate-45"
      />

      {/* Pink glow */}
      <div
        className="absolute top-20 left-1/2
        w-125 h-180 bg-[#c73fda]/60 blur-[100px] rounded-full -rotate-45"
      />

      {/* Blue glow */}
      <div
        className="absolute bottom-0 right-1/4
        w-180 h-100 bg-[#4f46e5]/40 blur-[120px] rounded-full"
      />
    </div>
  );
}