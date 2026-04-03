import Header from "@/components/ui/header";
import ConnectAccounts from "@/modules/accounts/components/connect-accounts";

export default function page() {
  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      <Header heading="Accounts"/>

      {/* Connection account */}
      <div className="p-2 xl:p-4 space-y-3">
        <div className="p-4 bg-neutral-900/20 border border-slate-700/40 rounded-xl">
          <h1 className="font-medium text-base xl:text-xl">Account connect</h1>
        </div>
        <div className="p-4 bg-neutral-900/20 border border-slate-700/40 rounded-xl max-md:pb-16">
          <ConnectAccounts />

        </div>
      </div>
    </section>
  )
}
