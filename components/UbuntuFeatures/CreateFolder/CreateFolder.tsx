"use client";

import FolderItem from "@/components/FolderItem/FolderItem";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useWorkspaceQuery } from "@/hooks/useWorkspaceQuery";
import { useWorkspaceState } from "@/hooks/useWorkspaceState";
import { FileText, Plus } from "lucide-react";

const CreateFolder = () => {
  const { getAllDataFromDB: items } = useWorkspaceQuery();
  const {
    activeWorkspaceId,
    setSelectedFolderId,
    setIsModalOpen,
    setModalType,
    setItemToRename,
  } = useWorkspaceState();

  const activeWorkspaceItems = items.filter(
    (i) => i.parentId === activeWorkspaceId,
  );

  const handleOpenCreateModal = () => {
    setItemToRename(null);
    setSelectedFolderId(activeWorkspaceId);
    setModalType("folder");
    setIsModalOpen(true);
  };

  return (
    <SidebarContent className="scrollbar-hide px-2">
      <SidebarGroup>
        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-zinc-400">
          Explorer
        </SidebarGroupLabel>
        <SidebarGroupAction
          onClick={handleOpenCreateModal}
          title="Add Folder / File"
          className="cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add Item</span>
        </SidebarGroupAction>

        <SidebarMenu>
          {activeWorkspaceItems.map((item) =>
            item.type === "folder" ? (
              <FolderItem key={item.id} item={item} />
            ) : (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  tooltip={item.name}
                  className="shrink-0 cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default CreateFolder;
