import Image from "next/image";
import Logo from "@/../public/logo.svg"
import Link from "next/link";
import { Button } from "../ui/button";

const navLinks: {lable: string, link: string}[] = [
    {lable: "Home", link: ""},
    {lable: "About", link: ""},
    {lable: "Price", link: ""},
    {lable: "Community", link: ""},
    {lable: "Doc", link: ""},
]

export function MainNavbar() {
  return (
    <nav className="sticky top-0 inset-x-0 h-fit flex items-center justify-between p-4">
        {/* Logo */}

        <div className="flex items-center gap-1 leading-0">
            <Image 
            src={Logo}
            alt=""
            width={40}
            height={40}
            className=""/>

            <h2 className="text-2xl text-neutral-300 font-semibold">Aayeshol</h2>
        </div>

        {/* Action Link */}

        <div className="flex items-center gap-20 p-2 px-16 bg-blue-700/10 funnelSans rounded-md">
            {navLinks.map((nav, index) => (
                <Link 
                key={index}
                href={nav.link}>
                    {nav.lable}
                </Link>
            ))}
        </div>

        {/* Get Started */}
        <Link href={"/auth"}>
          <Button>Get Started</Button>
        </Link>

    </nav>
  );
}