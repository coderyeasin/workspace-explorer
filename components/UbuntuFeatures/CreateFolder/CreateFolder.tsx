import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus, User2 } from "lucide-react";

const projects = [
  { name: "user1", icon: User2, url: "#" },
  { name: "user2", icon: User2, url: "#" },
  { name: "user3", icon: User2, url: "#" },
  { name: "user4", icon: User2, url: "#" },
  { name: "user5", icon: User2, url: "#" },
];

const CreateFolder = () => {
  return (
    <>
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
    </>
  );
};

export default CreateFolder;
