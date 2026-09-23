"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { WorkSpaceType, ContentType, IWorkspaceState } from "@/types/type";

const INITIAL_STATE: IWorkspaceState = {
  selectedFolderId: "root",
  activeWorkspaceId: "root",
  openFileId: null,
  expandedFolderIds: ["root", "projects", "webbly"],
  isModalOpen: false,
  modalType: "folder",
  itemToRename: null,
  isWorkspaceModalOpen: false,
};

const STATE_QUERY_KEY = ["workspace", "uiState"];

export function useWorkspaceState() {
  const queryClient = useQueryClient();

  const { data: state = INITIAL_STATE } = useQuery<IWorkspaceState>({
    queryKey: STATE_QUERY_KEY,
    queryFn: () => INITIAL_STATE,
    initialData: INITIAL_STATE,
    staleTime: Infinity,
  });

  // Functional updater
  const updateState = (updater: (prev: IWorkspaceState) => IWorkspaceState) => {
    queryClient.setQueryData<IWorkspaceState>(STATE_QUERY_KEY, (old) =>
      updater(old ?? INITIAL_STATE),
    );
  };

  return {
    selectedFolderId: state.selectedFolderId,
    activeWorkspaceId: state.activeWorkspaceId,
    openFileId: state.openFileId,
    expandedFolderIds: state.expandedFolderIds,
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    itemToRename: state.itemToRename,
    isWorkspaceModalOpen: state.isWorkspaceModalOpen,

    setActiveWorkspaceId: (id: string) =>
      updateState((prev) => ({
        ...prev,
        activeWorkspaceId: id,
        selectedFolderId: id,
        openFileId: null,
      })),

    setSelectedFolderId: (id: string) =>
      updateState((prev) => ({ ...prev, selectedFolderId: id })),

    setOpenFileId: (id: string | null) =>
      updateState((prev) => ({ ...prev, openFileId: id })),

    setExpandedFolderIds: (ids: string[] | ((prev: string[]) => string[])) =>
      updateState((prev) => ({
        ...prev,
        expandedFolderIds:
          typeof ids === "function" ? ids(prev.expandedFolderIds) : ids,
      })),

    toggleFolder: (id: string) =>
      updateState((prev) => ({
        ...prev,
        expandedFolderIds: prev.expandedFolderIds.includes(id)
          ? prev.expandedFolderIds.filter((item) => item !== id)
          : [...prev.expandedFolderIds, id],
      })),

    setIsModalOpen: (open: boolean) =>
      updateState((prev) => ({ ...prev, isModalOpen: open })),

    setModalType: (type: ContentType) =>
      updateState((prev) => ({ ...prev, modalType: type })),

    setItemToRename: (item: WorkSpaceType | null) =>
      updateState((prev) => ({ ...prev, itemToRename: item })),

    setIsWorkspaceModalOpen: (open: boolean) =>
      updateState((prev) => ({ ...prev, isWorkspaceModalOpen: open })),
  };
}
