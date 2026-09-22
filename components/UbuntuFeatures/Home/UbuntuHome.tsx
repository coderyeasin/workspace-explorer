import React from "react";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import Screen from "../Screen/Screen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const UbuntuHome = () => {
  return (
    <section>
      <div className="w-full h-8 bg-black text-white">
        <TopBar />
      </div>
      <div className="w-full h-full flex shrink-0 overflow-hidden ">
        <div className="h-[calc(100vh-2rem)]">
          <SidebarProvider className="">
            <SideBar />
            <SidebarTrigger className={`cursor-pointer`} />
          </SidebarProvider>
        </div>

        <div className="flex-1 w-full h-full ">
          <Screen />
        </div>
      </div>
    </section>
  );
};

export default UbuntuHome;
