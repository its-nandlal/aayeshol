import Noise from "@/../public/noise.jpg";
import FormAuth from "@/modules/auth/components/form-auth";
import Image from "next/image";

export default function Auth() {
  return (
    <section
      className="
      relative z-2 w-full min-h-screen
      bg-black
      grid grid-cols-1 md:grid-cols-2
      gap-6 md:gap-10
      p-4 md:p-6
      overflow-hidden
    "
    >
      {/* LEFT SIDE */}
      <div
        className="
        relative w-full h-full flex-col justify-end gap-5 p-4 md:p-6
        hidden md:flex
      "
      >
        {/* bg */}
        <div className="absolute inset-0 bg-linear-to-tl from-indigo-950 via-indigo-950/70 to-black">
          <Image
            src={Noise}
            alt="noise"
            fill
            className="object-cover mix-blend-color-dodge blur-2xl"
          />
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Get Started <br /> with Us
          </h1>
        </div>

        <div className="relative z-10 w-full grid grid-cols-3 gap-3 md:gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`
                w-full h-20 md:min-h-56 rounded-xl
                ${index === 0 ? "bg-slate-300" : "bg-slate-800"}
              `}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <FormAuth />
    </section>
  );
}