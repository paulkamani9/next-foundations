"use client";
import { usePathname } from "next/navigation";
import { UserButton } from "@/app/(main)/_components/user-button";

const pages = {
  settings: "/settings",
  main: "/main",
};

export const TopNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white text-xl font-bold flex justify-between w-full h-[100px] items-center px-6 shadow-md fixed top-0 left-0  z-50">
      {pathname === pages.settings && <span>Settings Page</span>}
      {pathname === pages.main && <span>Main Page</span>}
      <UserButton />
    </nav>
  );
};
