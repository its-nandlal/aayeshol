import Noise from "@/../public/noise.jpg";
import FormAuth from "@/modules/auth/components/form-auth";
import Image from "next/image";

export default function Auth() {
  return (
    <section
      className="relative z-2 w-full max-h-screen h-screen 
    bg-black
    grid grid-cols-2 gap-10 p-4
    overflow-hidden"
    >
      <div className="relative w-full h-full flex flex-col justify-end gap-5 p-6">
        {/* bg */}
        <div className=" absolute inset-0 bg-linear-to-tl from-indigo-950 from-0% via-indigo-950/70 via-5%  to-black to-100%">
          <Image
            src={Noise}
            alt="noise"
            width={1000}
            height={1000}
            className="w-full h-full object-cover mix-blend-color-dodge blur-2xl"
          />
        </div>

        <div>
          <h1 className="text-5xl font-semibold">
            Get Stared &
            <br />
            with Us
          </h1>
        </div>

        <div className="w-full grid grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`w-full min-h-56 ${index === 0 ? "bg-slate-300" : "bg-slate-800"}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Form auth*/}
      <FormAuth />
    </section>
  );
}
