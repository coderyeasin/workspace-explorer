import { FormEvent } from "react";

export type ContentType = "folder" | "file";

export type WorkSpaceType = {
  id: string;
  name: string;
  type: ContentType;
  parentId: string | null;
  content?: string;
  createdAt: number;
  updatedAt: number;
};

export type SetState<T> = (value: T) => void;

export interface IWorkspaceActions {
  createItem: (params: {
    name: string;
    type: ContentType;
    parentId: string;
    content?: string;
  }) => Promise<WorkSpaceType>;
  renameItem: (params: { id: string; newName: string }) => Promise<void>;
  deleteItem: (id: string) => Promise<void> | void;
  updateFileContent: (params: { id: string; content: string }) => Promise<void>;
  createWorkspace: (name: string) => Promise<WorkSpaceType>;
}

export interface IWorkspaceState {
  selectedFolderId: string;
  activeWorkspaceId: string;
  openFileId: string | null;
  expandedFolderIds: string[];
  isModalOpen: boolean;
  modalType: ContentType;
  itemToRename: WorkSpaceType | null;
  isWorkspaceModalOpen: boolean;
}

export interface ICustomModal {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
  submitLabel?: string;
  onSubmit: (e: FormEvent) => Promise<void> | void;
}

export interface IHandlerItemModalSubmit extends Pick<
  IWorkspaceActions,
  "createItem" | "renameItem"
> {
  e: FormEvent;
  modalName: string;
  currentFolder: WorkSpaceType | null;
  itemToRename: WorkSpaceType | null;
  modalType: ContentType;
  setOpenFileId: SetState<string | null>;
  setIsModalOpen: SetState<boolean>;
  setItemToRename: SetState<WorkSpaceType | null>;
}

export interface IHandleWorkspaceModalSubmit extends Pick<
  IWorkspaceActions,
  "createWorkspace"
> {
  e: FormEvent;
  workspaceName: string;
  setActiveWorkspaceId: SetState<string>;
  setWorkspaceName: SetState<string>;
  setIsWorkspaceModalOpen: SetState<boolean>;
}

export interface IHandleDelete extends Pick<IWorkspaceActions, "deleteItem"> {
  item: WorkSpaceType;
  selectedFolderId: string | null;
  setSelectedFolderId: SetState<string>;
  activeWorkspaceId: string | null;
  openFileId: string | null;
  setOpenFileId: SetState<string | null>;
}

export interface IDisplayItems {
  currentFolderContents: WorkSpaceType[];
  handleItemClick: (item: WorkSpaceType) => void;
  activeFile?: WorkSpaceType | null;
  openRenameModal: (item: WorkSpaceType) => void;
  deleteWorkspace: (item: WorkSpaceType) => void;
  isDirty: boolean;
  saveFile: () => void;
  setOpenFileId: SetState<string | null>;
  editorContent: string;
  setEditorContent: SetState<string>;
  setIsDirty: SetState<boolean>;
}

export interface IHandleBreadcrumbs {
  currentFolder?: WorkSpaceType | null;
  activeWorkspaceId: string;
  items: WorkSpaceType[];
}

export interface BreadcrumbsType extends IHandleBreadcrumbs {
  setSelectedFolderId: (id: string) => void;
}

export interface IHandleSaveFile extends Pick<
  IWorkspaceActions,
  "updateFileContent"
> {
  openFileId: string | null;
  editorContent: string;
  setIsDirty: SetState<boolean>;
}

export interface IModalHelper {
  itemToRename: WorkSpaceType | null;
  modalType: ContentType;
}
