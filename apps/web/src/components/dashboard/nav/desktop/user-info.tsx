import { useAuthStore } from "@/modules/auth/store/store.auth";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck } from "lucide-react";
import PrimaryButton from "@/components/ui/primary-button";
import Link from "next/link";

const SPRING = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 0.8,
} as const;

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [callback]);
  return ref;
};

export default function UserInfo({ panel }: { panel: boolean }) {
  const { user } = useAuthStore();
  const [selected, setSelected] = useState(false);
  const handleClose = useCallback(() => setSelected(false), []);
  const ref = useOutsideClick(handleClose);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);

  return (
    <motion.div
      animate={{
        justifyContent: panel ? "flex-start" : "center",
        paddingLeft: panel ? 8 : 0,
        paddingRight: panel ? 8 : 0,
      }}
      transition={SPRING}
      className="relative w-full flex items-center gap-3 pt-5"
    >
      <AnimatePresence>
        {selected && user && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed -right-10 top-2/3 z-10 bg-black/50 backdrop-blur-md"
          >
            <motion.div
              ref={ref}
              layoutId="user-avatar"
              transition={SPRING}
              className=" fixed inset-0 mx-auto h-fit w-72 bg-linear-to-t from-indigo-800 to-black border border-indigo-800/60 p-6 shadow-inner shadow-indigo-800/30 rounded-2xl "
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  layoutId="user-img"
                  className=" relative w-14 h-14 bg-indigo-700 flex items-center justify-center rounded-full ring-2 ring-indigo-500/30 shrink-0"
                >
                  {user.emailVerified && (
                    <BadgeCheck className=" absolute top-0 right-0 z-2 text-indigo-200 fill-blue-500 rounded-full" />
                  )}

                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="font-medium text-lg select-none">
                      {user.name.split("").map((e, i) => i === 0 && e)}
                      {user.lastname?.split("").map((e, i) => i === 0 && e)}
                    </span>
                  )}
                </motion.div>

                {/* Name + Email */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: 0.15 }}
                >
                  <motion.p
                    layoutId="user-name-lastname"
                    className="text-white font-semibold text-sm"
                  >
                    {user.name} {user.lastname}
                  </motion.p>

                  <motion.p
                    layoutId="user-email"
                    className="text-slate-400 text-xs mt-0.5"
                  >
                    {user.email}
                  </motion.p>
                </motion.div>
              </div>

              {/* Extra details — staggered */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.2 }}
                className=" border-t border-slate-700 pt-4 space-y-4"
              >
                <div className="flex items-center justify-between rounded">
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-slate-400 uppercase">STATE |</p>
                    <p className="text-xs text-slate-500">
                      {user.role === "USER" ? "NORMAL" : "PLATINUM"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <p className="text-xs text-slate-400 uppercase">
                      Verified |
                    </p>
                    <p className="text-xs text-slate-500">
                      {user.role === "USER" ? "YES" : "NO"}
                    </p>
                  </div>
                </div>

                <Link href={"/dashboard/settings"}>
                <PrimaryButton className=" brightness-65 shadow-indigo-700 hover:via-5% hover:to-60% rounded-full">
                  Settings
                </PrimaryButton>
                </Link>

                {/* <button
                  onClick={handleClose}
                  className="mt-3 w-full py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 transition"
                >
                  Close
                </button> */}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar — always visible, no layout jump */}

      <motion.div
        layoutId="user-avatar"
        onClick={() => setSelected(true)}
        className="w-10 h-10 bg-indigo-700 flex items-center justify-center shrink-0 rounded-full ring-2 ring-indigo-500/30 cursor-pointer"
        whileHover={{ scale: 1.08 }}
        transition={SPRING}
      >
        <motion.div
          className=" relative w-10 h-10 bg-indigo-700 flex items-center justify-center shrink-0 rounded-full ring-2 ring-indigo-500/30 cursor-pointer"
          whileHover={{ scale: 1.08 }}
          transition={SPRING}
          layoutId="user-img"
          onClick={() => setSelected(true)}
        >
          {user?.emailVerified && (
            <BadgeCheck className="absolute -top-1 -right-1 z-2 text-indigo-200 fill-blue-500 rounded-full" size={20} />
          )}
          {user?.image ? (
            <Image
              src={user.image}
              alt="User avatar"
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="block font-funnel-sans font-medium text-sm select-none">
              {user?.name.split("").map((e, i) => i === 0 && e)}
              {user?.lastname?.split("").map((e, i) => i === 0 && e)}
            </span>
          )}
        </motion.div>
      </motion.div>
      <AnimatePresence mode="wait">
        {panel && (
          <motion.div
            key="user-details"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
            className="flex-1 min-w-0 cursor-pointer"
            onClick={() => setSelected(true)}
          >
            <motion.p
              layoutId="user-name-lastname"
              className="text-sm font-funnel-sans font-medium truncate"
            >
              {user?.name} {user?.lastname}
            </motion.p>

            <motion.p
              layoutId="user-email"
              className="text-gray-400 text-xs truncate leading-relaxed"
            >
              {user?.email}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
