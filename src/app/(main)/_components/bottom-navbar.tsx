"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export const BottomNavbar = () => {
  const pathName = usePathname();
  return (
    <div className="bg-transparent px-2 w-full fixed flex flex-col justify-start items-center  bottom-0 h-[100px]  z-50">
      <nav className=" bg-white flex justify-center items-center h-[90%] w-full rounded-lg shadow-up  bottom-4 mx-auto gap-8">
        <Link href="/main">
          <Button asChild variant={pathName === "/main" ? "default" : "link"}>
            <span className="text-base font-semibold">Main Page </span>
          </Button>
        </Link>
        <Link href="/settings">
          <Button
            asChild
            variant={pathName === "/settings" ? "default" : "link"}
          >
            <span className="text-base font-semibold">Settings Page </span>
          </Button>
        </Link>
      </nav>
    </div>
  );
};
