"use client";

import { logOut } from "@/actions/auth/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}
export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logOut();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
