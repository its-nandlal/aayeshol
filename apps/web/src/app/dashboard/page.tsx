"use client"

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { toast } from "sonner";


export default function Dashboard() {

  const notify = () =>{
     toast.success("Notify successfully. ")
     toast.success("Notify successfully. ")
     toast.error("Error 404 is not founded")
  }

  return (
    <section className="w-full min-h-screen">
      <Header heading="Dashboard" />
      <Button onClick={notify}>Notify</Button>
    </section>
  );
}
