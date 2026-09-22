import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronsUpDown, Folder, Plus, User2 } from "lucide-react";

const SideBar = () => {
  const user = {
    name: "Jishan",
    email: "jishan@gmail.com",
    avatar: "URL",
  };

  const projects = [
    { name: "user1", icon: User2, url: "#" },
    { name: "user2", icon: User2, url: "#" },
    { name: "user3", icon: User2, url: "#" },
    { name: "user4", icon: User2, url: "#" },
    { name: "user5", icon: User2, url: "#" },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="py-10 group-data-[side=left]:border-r-0 group-data-[side=right]:border-l-0"
    >
      <SidebarHeader className="flex flex-col items-center px-4 border-b border-gray-300">
        <p className="flex items-center gap-3 shrink-0">
          <Folder className="h-5 w-5 shrink-0" />
          <span className="font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            Workspace Explorer
          </span>
        </p>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide">
        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Folder</span>
          </SidebarGroupAction>
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton
                  className="shrink-0"
                  tooltip={project.name}
                  render={<a href={project?.url} />}
                >
                  <project.icon />
                  <span>{project.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`border-t border-gray-300`}
                render={
                  <SidebarMenuButton size="lg">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage alt={user.name} src={user.avatar} />
                      <AvatarFallback className="rounded-lg">YA</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent
                align="end"
                side="bottom"
                sideOffset={4}
                className="min-w-52 rounded-lg border-0"
              >
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>Logout</p>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
