"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ExitIcon } from "@radix-ui/react-icons";
import { FaUser } from "react-icons/fa6";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className="bg-gray-400 text-white">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="align-end">
        {user?.email && (
          <span className="border border-b-gray text-muted-foreground p-2 ">
            {user.email}
          </span>
        )}
        <LogoutButton>
          <DropdownMenuItem className="flex items-center justify-start text-base gap-2 text-destructive font-semibold cursor-pointer">
            <ExitIcon className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
