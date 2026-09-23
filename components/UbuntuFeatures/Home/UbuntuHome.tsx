import React from "react";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import Screen from "../Screen/Screen";
import { SidebarProvider } from "@/components/ui/sidebar";

const UbuntuHome = () => {
  return (
    <section>
      <header className="relative z-50 w-full h-8 bg-black text-white shrink-0 border-b border-zinc-800/50">
        <TopBar />
      </header>
      <div className="relative z-0 w-full h-[calc(100vh-2rem)] flex flex-1 overflow-hidden">
        <SidebarProvider className="h-full w-full">
          <SideBar />
          <main className="flex-1 w-full h-full overflow-hidden">
            <Screen />
          </main>
        </SidebarProvider>
      </div>
    </section>
  );
};

export default UbuntuHome;
