import {
  IHandleDelete,
  IHandlerItemModalSubmit,
  IHandleSaveFile,
  IHandleWorkspaceModalSubmit,
  IModalHelper,
  WorkSpaceType,
  IHandleBreadcrumbs,
} from "@/types/type";

// Breadcrumb
export const handleBreadcrumbs = ({
  currentFolder,
  activeWorkspaceId,
  items,
}: IHandleBreadcrumbs): WorkSpaceType[] => {
  const trail: WorkSpaceType[] = [];
  let currId: string | null = currentFolder?.id ?? activeWorkspaceId;

  while (currId) {
    const found = items.find((i) => i.id === currId);
    if (found) {
      trail.unshift(found);
      currId = found.parentId;
    } else {
      break;
    }
  }
  return trail;
};
// Folder / File / Rename Submit
export const handleItemModalSubmit = async ({
  e,
  modalName,
  currentFolder,
  itemToRename,
  renameItem,
  createItem,
  modalType,
  setOpenFileId,
  setIsModalOpen,
  setItemToRename,
}: IHandlerItemModalSubmit): Promise<void> => {
  e.preventDefault();
  if (!modalName.trim() || !currentFolder) return;

  try {
    if (itemToRename) {
      await renameItem({ id: itemToRename.id, newName: modalName.trim() });
    } else {
      const created = await createItem({
        name: modalName.trim(),
        type: modalType,
        parentId: currentFolder.id,
        content: modalType === "file" ? "" : undefined,
      });

      if (modalType === "file") setOpenFileId(created.id);
    }
    setIsModalOpen(false);
    setItemToRename(null);
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : String(err));
  }
};

// New Workspace
export const handleWorkspaceModalSubmit = async ({
  e,
  workspaceName,
  createWorkspace,
  setActiveWorkspaceId,
  setWorkspaceName,
  setIsWorkspaceModalOpen,
}: IHandleWorkspaceModalSubmit): Promise<void> => {
  e.preventDefault();
  if (!workspaceName.trim()) return;

  try {
    const newWs = await createWorkspace(workspaceName.trim());
    setActiveWorkspaceId(newWs.id);
    setWorkspaceName("");
    setIsWorkspaceModalOpen(false);
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : String(err));
  }
};

// Delete Item
export const handleDelete = async ({
  item,
  selectedFolderId,
  setSelectedFolderId,
  activeWorkspaceId,
  openFileId,
  setOpenFileId,
  deleteItem,
}: IHandleDelete): Promise<void> => {
  if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
    if (item.id === selectedFolderId) {
      const targetFolderId = item.parentId ?? activeWorkspaceId;
      if (targetFolderId) {
        setSelectedFolderId(targetFolderId);
      }
    }
    if (item.id === openFileId) setOpenFileId(null);
    await deleteItem(item.id);
  }
};

// Save File
export const handleSaveFile = async ({
  openFileId,
  editorContent,
  updateFileContent,
  setIsDirty,
}: IHandleSaveFile): Promise<void> => {
  if (!openFileId) return;
  await updateFileContent({ id: openFileId, content: editorContent });
  setIsDirty(false);
};

// Modal Title & Placeholder
export const getItemModalTitle = ({
  itemToRename,
  modalType,
}: IModalHelper): string => {
  if (itemToRename) return `Rename ${itemToRename.type}`;
  return `Create New ${modalType === "folder" ? "Folder" : "File"}`;
};

export const getItemModalPlaceholder = ({
  itemToRename,
  modalType,
}: IModalHelper): string => {
  if (itemToRename) return itemToRename.name;
  return modalType === "folder" ? "Folder name" : "File name";
};
