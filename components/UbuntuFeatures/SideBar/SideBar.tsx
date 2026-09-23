"use client";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Folder } from "lucide-react";
import CreateFolder from "../CreateFolder/CreateFolder";

const SideBar = () => {
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

      <SidebarFooter className="border-t border-gray-800 px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default hover:bg-transparent"
              title="Data is stored in this browser"
            >
              <Folder className="h-4 w-4 text-emerald-400" />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">Local storage</span>
                <span className="truncate text-xs text-zinc-400">
                  Saved in this browser
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
