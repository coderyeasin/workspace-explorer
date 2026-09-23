"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, Folder, LogOut, User } from "lucide-react";
import CreateFolder from "../CreateFolder/CreateFolder";

const SideBar = () => {
  const user = {
    name: "Jishan",
    email: "jishan@gmail.com",
    avatar: "https://github.com/shadcn.png",
  };

  return (
    <Sidebar
      collapsible="icon"
      className="py-10 group-data-[side=left]:border-r-0 group-data-[side=right]:border-l-0 bg-zinc-950 text-white"
    >
      {/* Header containing title and responsive trigger */}
      <SidebarHeader className="flex flex-row items-center justify-between px-3 pb-3 border-b border-gray-800">
        <div className="flex items-center gap-2 overflow-hidden">
          <Folder className="h-5 w-5 shrink-0 text-amber-500" />
          <span className="font-semibold tracking-tight truncate group-data-[collapsible=icon]:hidden">
            Workspace Explorer
          </span>
        </div>
        <SidebarTrigger className="cursor-pointer text-zinc-400 hover:text-white" />
      </SidebarHeader>

      <CreateFolder />

      <SidebarFooter className="border-t border-gray-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="hover:bg-zinc-800 border-t border-gray-800"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage alt={user.name} src={user.avatar} />
                      <AvatarFallback className="rounded-lg bg-zinc-800 text-white">
                        JI
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs text-zinc-400">
                        {user?.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                }
              ></DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                side="right"
                sideOffset={8}
                className="min-w-52 rounded-lg border border-zinc-800 bg-zinc-900 text-white"
              >
                <div className="p-2 border-b border-zinc-800">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-zinc-400">{user.email}</p>
                </div>
                <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800">
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-zinc-800 focus:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
