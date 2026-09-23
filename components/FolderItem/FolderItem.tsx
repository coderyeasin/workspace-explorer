import { useWorkspaceQuery } from "@/hooks/useWorkspaceQuery";
import { useWorkspaceState } from "@/hooks/useWorkspaceState";
import { WorkSpaceType } from "@/types/type";
import { Folder, FileText, ChevronRight } from "lucide-react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

const FolderItem = ({ item }: { item: WorkSpaceType }) => {
  const { getAllDataFromDB: items } = useWorkspaceQuery();
  const {
    selectedFolderId,
    setSelectedFolderId,
    expandedFolderIds,
    toggleFolder,
    setOpenFileId,
  } = useWorkspaceState();

  const children = items.filter((i) => i.parentId === item.id);
  const isExpanded = expandedFolderIds.includes(item.id);
  const isSelected = selectedFolderId === item.id;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isSelected}
        onClick={() => {
          setSelectedFolderId(item.id);
          if (children.length > 0) toggleFolder(item.id);
        }}
        tooltip={item.name}
        className="shrink-0 cursor-pointer"
      >
        <Folder className="h-4 w-4 text-amber-400 shrink-0" />
        <span className="truncate flex-1">{item.name}</span>
        {children.length > 0 && (
          <ChevronRight
            className={`h-3 w-3 transition-transform duration-200 text-zinc-400 group-data-[collapsible=icon]:hidden ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        )}
      </SidebarMenuButton>

      {/* sub-items recursively */}
      {isExpanded && children.length > 0 && (
        <SidebarMenuSub className="ml-2.5 pl-2 border-l border-zinc-700 group-data-[collapsible=icon]:hidden">
          {children.map((child) =>
            child.type === "folder" ? (
              <FolderItem key={child.id} item={child} />
            ) : (
              <SidebarMenuItem key={child.id}>
                <SidebarMenuButton
                  size="sm"
                  onClick={() => {
                    setSelectedFolderId(item.id);
                    setOpenFileId(child.id);
                  }}
                  tooltip={child.name}
                  className="text-zinc-300 hover:text-white cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{child.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
};
export default FolderItem;
