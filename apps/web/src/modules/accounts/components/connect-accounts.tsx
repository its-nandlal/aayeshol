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
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) callback();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callback]);
  return ref;
};

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

export default function ConnectAccounts() {
  const { data: accounts, isLoading } = useSocialAccounts();
  const { connect } = useConnectLinkedIn();
  const [selected, setSelected] = useState<string | null>(null);

  useLinkedInCallback();

  const handleClose = useCallback(() => setSelected(null), []);
  const ref = useOutsideClick(handleClose);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);

  const ACCOUNTS = [
    {
      label: "LinkedIn",
      icon: Linkedin,
      provider: "linkedin" as const,
      connected: accounts?.linkedin.connected ?? false,
      connectedName: accounts?.linkedin.connected
        ? accounts.linkedin.name
        : null,
      connectedEmail: accounts?.linkedin.connected
        ? accounts.linkedin.email
        : null,
      connectedImage: accounts?.linkedin.connected
        ? accounts.linkedin.image
        : null,
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
    // 1. LayoutGroup — sabhi layoutId ko ek scope mein baandho
    <LayoutGroup>
      <div className="relative w-full">
        {/* ======== Modal ======== */}
        <AnimatePresence>
          {selected && selectedAccount && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-10 bg-black/40"
                onClick={handleClose}
              />

              {/* 2. Modal — layoutId card se match, layout prop zaroori */}
              {/* Modal Card */}
              <motion.div
                ref={ref}
                key={`modal-${selectedAccount.provider}`}
                layoutId={`card-${selectedAccount.provider}`}
                layout
                transition={SPRING}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-80 rounded-2xl border border-slate-700/80 bg-linear-to-b from-indigo-950 to-black shadow-2xl overflow-hidden"
              >

                <div className="p-6 flex flex-col items-center text-center gap-4">
                  {/* Close */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition cursor-pointer"
                  >
                    <X size={15} />
                  </motion.button>

                  {/* Profile Image ya Icon */}
                  <motion.div
                    layoutId={`icon-${selectedAccount.provider}`}
                    layout
                    transition={SPRING}
                    className="relative"
                  >
                    {selectedAccount.connectedImage ? (
                      <div className="relative">
                        <Image
                          src={selectedAccount.connectedImage}
                          alt={selectedAccount.connectedName ?? ""}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full object-cover border-2 border-indigo-200/60"
                        />
                        {/* Platform icon badge */}
                        <div
                          className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-black backdrop-blur-sm`}
                          style={{ backgroundColor: selectedAccount.bgColor }}
                        >
                          <selectedAccount.icon
                            size={13}
                            style={{ color: selectedAccount.color }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: selectedAccount.bgColor }}
                      >
                        <selectedAccount.icon
                          size={32}
                          style={{ color: selectedAccount.color }}
                        />
                      </div>
                    )}
                  </motion.div>

                  {/* Name & Platform */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.12 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <p className="text-base font-semibold text-white">
                      {selectedAccount.connectedName ?? selectedAccount.label}
                    </p>
                    {/* Platform badge */}
                    <motion.span
                    layoutId={`label-${selectedAccount.provider}`}
                      className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: selectedAccount.bgColor,
                        color: selectedAccount.color,
                      }}
                    >
                      {selectedAccount.label}
                    </motion.span>
                  </motion.div>

                  {/* Divider */}
                  <div className="w-full h-px bg-slate-800" />

                  {/* Info rows */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.18 }}
                    className="w-full space-y-3"
                  >
                    {selectedAccount.connectedEmail && (
                      <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
                        <span className="text-xs text-slate-500">Email</span>
                        <span className="text-xs text-slate-200">
                          {selectedAccount.connectedEmail}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
                      <span className="text-xs text-slate-500">Status</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: "#4ade80",
                            boxShadow: "0 0 5px #4ade80",
                          }}
                        />
                        <span className="text-xs text-green-400 font-medium">
                          Connected
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
                      <span className="text-xs text-slate-500">Platform</span>
                      <span className="text-xs text-slate-200">
                        {selectedAccount.label}
                      </span>
                    </div>
                  </motion.div>

                  {/* Disconnect button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.22 }}
                    className="w-full py-2 rounded-xl text-xs font-medium text-red-400 border border-red-900/40 hover:bg-red-950/30 transition cursor-pointer"
                  >
                    Disconnect Account
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ======== Cards Grid ======== */}
        <div
          className={cn(
            "w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-2",
            // 5. Smooth blur/scale transition
            "transition-[filter,transform] duration-300 ease-in-out",
            selected && "blur-sm scale-95 pointer-events-none",
          )}
        >
          {ACCOUNTS.map((account) => {
            const Icon = account.icon;
            const isConnected = account.connected;

            return (
              // 6. layout prop — grid reflow smoothly animate ho
              <motion.div
                key={account.provider}
                layoutId={`card-${account.provider}`}
                layout
                transition={SPRING}
                onClick={() =>
                  isConnected ? setSelected(account.provider) : null
                }
                className={cn(
                  "relative flex flex-col gap-5 p-5 rounded-2xl",
                  "border transition-colors duration-300",
                  "bg-linear-to-b from-indigo-700/60 via-black/40 to-black",
                  isConnected
                    ? "border-slate-700/80 cursor-pointer"
                    : "border-slate-800/60 hover:border-slate-700/60",
                )}
                style={{
                  boxShadow: isConnected
                    ? `0 0 0 1px ${account.color}22, inset 0 0 30px ${account.color}08`
                    : "none",
                }}
              >
                {isConnected && (
                  <span
                    className="absolute top-4 right-4 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: "#4ade80",
                      boxShadow: "0 0 6px #4ade80",
                    }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <motion.div
                    layoutId={`icon-${account.provider}`}
                    layout
                    transition={SPRING}
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-neutral-900 shrink-0"
                    style={{ backgroundColor: account.bgColor }}
                  >
                    <Icon size={22} style={{ color: account.color }} />
                  </motion.div>
                  <div>
                    <motion.p
                      layoutId={`label-${account.provider}`}
                      layout
                      transition={SPRING}
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

                <div
                  className={cn(
                    "h-px w-full rounded-full",
                    isConnected ? "opacity-40" : "opacity-10",
                  )}
                  style={{ backgroundColor: account.color }}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    account.onConnect?.();
                  }}
                  disabled={isConnected || !account.onConnect}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200",
                    isConnected || !account.onConnect
                      ? "bg-transparent border-slate-800 text-slate-500 cursor-default"
                      : "border-slate-700/60 text-slate-300 cursor-pointer hover:text-white hover:border-slate-600 hover:bg-slate-800/40",
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
    </LayoutGroup>
  );
}
