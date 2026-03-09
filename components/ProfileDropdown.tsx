"use client";

import { logout } from "@/action/user";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, ShieldUser, UserPen, UserStar } from "lucide-react";
import Link from "next/link";

type ProfileDropdownProps = {
  name: string;
  img: string;
};

export function ProfileDropdown({ name, img }: ProfileDropdownProps) {
  const logoutUser = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={img || "/img/profile/default.jpg"}
            className="w-10 rounded-full p-1 border border-accent-foreground dark:border-primary aspect-square"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button variant="secondary" asChild>
              <Link
                href="/admin/dashboard"
                className="flex items-center justify-start gap-2 w-full"
              >
                <ShieldUser />
                Admin Dashboard
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="secondary" asChild>
              <Link
                href="/admin/profile"
                className="flex items-center justify-start gap-2 w-full"
              >
                <UserPen />
                {name}
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logoutUser} className="cursor-pointer">
            <Button variant="secondary" asChild>
              <div className="w-full flex justify-start">
                <LogOut />
                Logout
              </div>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
