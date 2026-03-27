import { useAuthStore } from "@/modules/auth/store/store.auth";
import { motion } from "motion/react";
import { AlertTriangle, BadgeCheck, BadgeX } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RowProps {
  label: string;
  value?: React.ReactNode;
  delay?: number;
}

function Row({ label, value, delay = 0 }: RowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
    >
      <div className="flex items-center justify-between py-4 px-1">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="text-sm text-white font-medium">{value ?? "—"}</span>
      </div>
      <Separator className="bg-slate-700/40" />
    </motion.div>
  );
}

export default function UserSettings() {
  const { user } = useAuthStore();

  const fullName =
    [user?.name, user?.lastname].filter(Boolean).join(" ") || "—";

  const maskedEmail = user?.email
    ? (() => {
        const [local, domain] = user.email.split("@");
        if (local.length <= 4) return user.email;
        const start = local.slice(0, 3);
        const end = local.slice(-1);
        return `${start}${"*".repeat(8)}${end}@${domain}`;
      })()
    : "—";

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  const roleBadge =
    user?.role === "USER" ? (
      <Badge
        variant="outline"
        className="text-xs border-slate-500/40 text-slate-300 bg-slate-500/10"
      >
        Normal
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="text-xs border-yellow-500/50 text-yellow-300 bg-yellow-500/10"
      >
        ✦ Platinum
      </Badge>
    );

  const verifiedBadge = user?.emailVerified ? (
    <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
      <BadgeCheck className="w-4 h-4" />
      Verified
    </span>
  ) : (
    <span className="flex items-center gap-1.5 text-red-400 text-sm font-medium">
      <BadgeX className="w-4 h-4" />
      Not Verified
    </span>
  );

  return (
    <div className="px-6 pb-6">
      <div>
        <Row label="Name" value={fullName} delay={0.05} />
        <Row label="Email address" value={maskedEmail} delay={0.1} />
        <Row label="Email verified" value={verifiedBadge} delay={0.15} />
        <Row label="Account type" value={roleBadge} delay={0.2} />
        <Row label="Member since" value={formattedDate} delay={0.25} />


        {/* Delete account row */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut", delay: 0.35 }}
        >
          <div className="flex items-center justify-between py-4 px-1">
            <span className="text-sm text-slate-400">Delete account</span>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="px-5 py-1.5 rounded-full border border-red-500/60 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors duration-200 cursor-pointer">
                  Delete
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent className="border border-red-500/25 bg-[#0d0a0f]/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl shadow-black/60 max-w-sm">
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                </div>

                <AlertDialogHeader className="text-center space-y-1.5">
                  <AlertDialogTitle className="text-white text-base text-center font-semibold">
                    Account delete karen?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-400 text-sm text-center leading-relaxed">
                    Aapka sara data — profile, settings, history — permanently
                    delete ho jayega. Yeh action{" "}
                    <span className="text-red-400 font-medium">undo nahi</span>{" "}
                    ho sakta.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex gap-2 pt-2">
                  <AlertDialogCancel className="flex-1 bg-white/5 border-slate-700 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      // handleDeleteAccount()
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium cursor-pointer"
                  >
                    Yes, Deleted
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Separator className="bg-slate-700/40" />
        </motion.div>
      </div>
    </div>
  );
}