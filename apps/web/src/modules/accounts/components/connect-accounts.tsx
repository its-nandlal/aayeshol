"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useConnectLinkedIn,
  useSocialAccounts,
  useLinkedInCallback,
} from "../hooks/user-connect-account";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

// ======== Outside Click Hook ========
const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callback]);
  return ref;
};

export default function ConnectAccounts() {
  const { data: accounts, isLoading } = useSocialAccounts();
  const { connect } = useConnectLinkedIn();
  const [selected, setSelected] = useState<string | null>(null);

  useLinkedInCallback();

  const handleClose = useCallback(() => setSelected(null), []);
  const ref = useOutsideClick(handleClose);

  // Background scroll lock
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selected]);

  const ACCOUNTS = [
    {
      label: "LinkedIn",
      icon: Linkedin,
      provider: "linkedin" as const,
      connected: accounts?.linkedin.connected ?? false,
      connectedName: accounts?.linkedin.connected ? accounts.linkedin.name : null,
      connectedEmail: accounts?.linkedin.connected ? accounts.linkedin.email : null,
      connectedImage: accounts?.linkedin.connected ? accounts.linkedin.image : null,
      color: "#0A66C2",
      bgColor: "rgba(10,102,194,0.15)",
      onConnect: connect,
    },
    {
      label: "Instagram",
      icon: Instagram,
      provider: "instagram" as const,
      connected: accounts?.instagram.connected ?? false,
      connectedName: null,
      connectedEmail: null,
      connectedImage: null,
      color: "#E1306C",
      bgColor: "rgba(225,48,108,0.15)",
      onConnect: null,
    },
    {
      label: "Facebook",
      icon: Facebook,
      provider: "facebook" as const,
      connected: accounts?.facebook.connected ?? false,
      connectedName: null,
      connectedEmail: null,
      connectedImage: null,
      color: "#1877F2",
      bgColor: "rgba(24,119,242,0.15)",
      onConnect: null,
    },
    {
      label: "X (Twitter)",
      icon: Twitter,
      provider: "twitter" as const,
      connected: accounts?.twitter.connected ?? false,
      connectedName: null,
      connectedEmail: null,
      connectedImage: null,
      color: "#e2e8f0",
      bgColor: "rgba(226,232,240,0.10)",
      onConnect: null,
    },
  ];

  const selectedAccount = ACCOUNTS.find((a) => a.provider === selected);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative w-full">

      {/* ======== Expanded Modal ======== */}
      <AnimatePresence>
        {selected && selectedAccount && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-10 bg-black/50 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              ref={ref}
              layoutId={`card-${selectedAccount.provider}`}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed inset-0 z-20 m-auto h-fit w-80 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Icon */}

                <motion.div
                layoutId={`icon-${selectedAccount.provider}`}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: selectedAccount.bgColor }}
              >
                <selectedAccount.icon size={26} style={{ color: selectedAccount.color }} />
                </motion.div>
              

              {/* Details — staggered */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-4 space-y-4 mt-2"
              >
                {/* Profile Image */}
                {selectedAccount.connectedImage && (
                  <Image
                    src={selectedAccount.connectedImage}
                    alt={selectedAccount.connectedName ?? ""}
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover bg-red-800 border-2 border-slate-700"
                  />
                )}
                

                <div className="space-y-2 border-l border-slate-700/60 pl-4">
                {/* Name */}
                {selectedAccount.connectedName && (
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Name</p>
                    <p className="text-sm font-semibold text-white">
                      {selectedAccount.connectedName}
                    </p>
                  </div>
                )}

                {/* Email */}
                {selectedAccount.connectedEmail && (
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Email</p>
                    <p className="text-sm text-slate-300">
                      {selectedAccount.connectedEmail}
                    </p>
                  </div>
                )}

                {/* Connected Badge */}
                <div className="flex items-center gap-2 pt-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
                  />
                  <span className="text-xs text-green-400 font-medium">Account Connected</span>
                </div>
                </div>


              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ======== Cards Grid ======== */}
      <div className={cn(
        "w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-6 transition duration-300",
        selected && "blur-sm scale-95"
      )}>
        {ACCOUNTS.map((account) => {
          const Icon = account.icon;
          const isConnected = account.connected;

          return (
            <motion.div
              key={account.provider}
              layoutId={`card-${account.provider}`}
              onClick={() => isConnected ? setSelected(account.provider) : null}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className={cn(
                "relative flex flex-col gap-5 p-5 rounded-2xl",
                "border transition-colors duration-300",
                "bg-linear-to-tl from-indigo-800/20 to-blue-800/20 backdrop-blur-2xl",
                isConnected
                  ? "border-slate-700/80 cursor-pointer"
                  : "border-slate-800/60 hover:border-slate-700/60"
              )}
              style={{
                boxShadow: isConnected
                  ? `0 0 0 1px ${account.color}22, inset 0 0 30px ${account.color}08`
                  : "none",
              }}
            >
              {/* Green dot */}
              {isConnected && (
                <span
                  className="absolute top-4 right-4 w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
                />
              )}

              {/* Icon + Label */}
              <div className="flex items-center gap-3">
                <motion.div
                  layoutId={`icon-${account.provider}`}
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: account.bgColor }}
                >
                  <Icon size={22} style={{ color: account.color }} />
                </motion.div>
                <div>
                  <motion.p
                    layoutId={`label-${account.provider}`}
                    className="text-sm font-semibold text-white"
                  >
                    {account.label}
                  </motion.p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isConnected && account.connectedName
                      ? account.connectedName
                      : isConnected
                      ? "Connected"
                      : "Not connected"}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div
                className={cn("h-px w-full rounded-full", isConnected ? "opacity-40" : "opacity-10")}
                style={{ backgroundColor: account.color }}
              />

              {/* CTA Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // card click se alag
                  account.onConnect?.();
                }}
                disabled={isConnected || !account.onConnect}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-medium",
                  "border transition-all duration-200",
                  isConnected || !account.onConnect
                    ? "bg-transparent border-slate-800 text-slate-500 cursor-default"
                    : "border-slate-700/60 text-slate-300 cursor-pointer hover:text-white hover:border-slate-600 hover:bg-slate-800/40"
                )}
              >
                {isConnected ? (
                  <>
                    <span>View Details</span>
                    <CheckCircle2 size={13} style={{ color: "#4ade80" }} />
                  </>
                ) : !account.onConnect ? (
                  <>
                    <span>Coming Soon</span>
                    <ArrowRight size={13} />
                  </>
                ) : (
                  <>
                    <span>Connect</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}