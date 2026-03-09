"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import { items } from "@/helpers/links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronUp, LogOut, User2, UserPen } from "lucide-react";
import { logout } from "@/action/user";
import Link from "next/link";
import Image from "next/image";

type AppSidebarProps = {
  name: string;
  img: string;
};

export function AppSidebar({ name, img }: AppSidebarProps) {
  const logoutUser = async () => {
    await logout();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="text-[#1F2E27] dark:text-[#E1E8E4] font-medium hover:bg-foreground/10 rounded p-1">
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Image
                    src={img || "/img/profile/default.jpg"}
                    width={40}
                    height={40}
                    alt="profile image"
                    className="rounded-full aspect-square"
                  />{" "}
                  {name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Link href="/admin/profile" className="flex items-center gap-2">
                    <UserPen />
                    User profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutUser} className="cursor-pointer">
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
