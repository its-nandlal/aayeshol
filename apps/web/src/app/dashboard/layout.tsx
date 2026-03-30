import Background from "@/components/background";
import NavDesktop from "@/components/dashboard/nav/desktop/nav-desktop";


interface DeshboardLayoutProps {
  children: React.ReactNode;
  settings: React.ReactNode;
}

export default function DeshboardLayout({children, settings}: DeshboardLayoutProps) {
  return (
    <div className="w-full max-h-screen h-screen bg-black flex overflow-hidden">
        <NavDesktop />
      <main className="relative z-2 flex-1 bg-black/50">
          {children}
          {settings}
      </main>
      <Background />
    </div>
  )
}
