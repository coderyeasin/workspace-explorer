"use client";

import React, { useState } from "react";
import SearchBox from "../Search/Search";
import { useWorkspaceState } from "@/hooks/useWorkspaceState";
import { WorkSpaceType, ContentType } from "@/types/type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Folder, Plus, Layers, ChevronDown } from "lucide-react";
import { useWorkspaceQuery } from "@/hooks/useWorkspaceQuery";
import {
  getItemModalPlaceholder,
  getItemModalTitle,
  handleDelete,
  handleItemModalSubmit,
  handleSaveFile,
  handleWorkspaceModalSubmit,
} from "@/utils/handler";
import CustomModal from "@/Shared/CustomModal";
import DisplayItems from "@/components/DisplayItems/DisplayItems";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcumbs";

const Screen = () => {
  const {
    getAllDataFromDB: items,
    createNewItemIntoDB: createItem,
    createNewWorkSpace: createWorkspace,
    renameWorkSpace: renameItem,
    updateAContentIntoDB: updateFileContent,
    deleteWorkspace: deleteItem,
  } = useWorkspaceQuery();

  const {
    activeWorkspaceId,
    setActiveWorkspaceId,
    selectedFolderId,
    setSelectedFolderId,
    openFileId,
    setOpenFileId,
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    itemToRename,
    setItemToRename,
    isWorkspaceModalOpen,
    setIsWorkspaceModalOpen,
  } = useWorkspaceState();

  // States for Modals
  const [modalName, setModalName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");

  // Editor State
  const [editorContent, setEditorContent] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  // Active Context
  const workspaces = items.filter(
    (i) => i.parentId === null && i.type === "folder",
  );
  const activeFile = openFileId ? items.find((i) => i.id === openFileId) : null;
  const currentFolder =
    items.find((i) => i.id === selectedFolderId) ??
    items.find((i) => i.id === activeWorkspaceId) ??
    workspaces[0] ??
    null;

  const currentFolderContents = items.filter(
    (i) => i.parentId === currentFolder?.id,
  );

  // Create (File or Folder)
  const openCreateModal = (type: ContentType) => {
    setItemToRename(null);
    setModalType(type);
    setModalName("");
    setIsModalOpen(true);
  };

  // Rename
  const openRenameModal = (item: WorkSpaceType) => {
    setItemToRename(item);
    setModalType(item.type);
    setModalName(item.name);
    setIsModalOpen(true);
  };

  // Creation Workspace
  const openWorkspaceModal = () => {
    setWorkspaceName("");
    setIsWorkspaceModalOpen(true);
  };

  // Item Clicks
  const handleItemClick = (item: WorkSpaceType) => {
    if (item.type === "folder") {
      setSelectedFolderId(item.id);
    } else {
      setOpenFileId(item.id);
      setEditorContent(item.content ?? "");
      setIsDirty(false);
    }
  };

  //  Submit Modal
  const itemModalSubmit = (e: React.FormEvent) => {
    handleItemModalSubmit({
      e,
      modalName,
      currentFolder,
      itemToRename,
      modalType,
      renameItem,
      createItem,
      setOpenFileId,
      setIsModalOpen,
      setItemToRename,
    });
  };

  const workspaceModalSubmit = (e: React.FormEvent) => {
    handleWorkspaceModalSubmit({
      e,
      workspaceName,
      createWorkspace,
      setActiveWorkspaceId,
      setWorkspaceName,
      setIsWorkspaceModalOpen,
    });
  };

  const deleteWorkspace = (item: WorkSpaceType) => {
    handleDelete({
      item,
      selectedFolderId,
      setSelectedFolderId,
      activeWorkspaceId,
      openFileId,
      setOpenFileId,
      deleteItem,
    });
  };

  const saveFile = () => {
    handleSaveFile({
      openFileId,
      editorContent,
      updateFileContent,
      setIsDirty,
    });
  };

  const modalTitle = getItemModalTitle({ itemToRename, modalType });
  const modalPlaceholder = getItemModalPlaceholder({ itemToRename, modalType });

  return (
    <div className="h-[calc(100vh-2rem)] px-6 py-4 bg-gradient-to-br from-[#2C001E] via-[#77216F] to-[#E95420] text-white flex flex-col overflow-hidden">
      <div className="mb-4">
        <SearchBox />
      </div>
      <div className="flex items-center justify-between pb-3 border-b border-white/20 gap-2">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 text-white border-white/20 hover:bg-black/50 text-xs font-semibold"
                >
                  <Layers className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
                  <span>
                    {items.find((i) => i.id === activeWorkspaceId)?.name ??
                      "Workspace"}
                  </span>
                  <ChevronDown className="h-3 w-3 ml-1 text-zinc-400" />
                </Button>
              }
            />
            <DropdownMenuContent
              align="start"
              className="bg-zinc-900 border-zinc-800 text-white z-50"
            >
              <div className="p-2 text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                Workspaces
              </div>
              {workspaces.map((ws) => (
                <DropdownMenuItem
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspaceId(ws.id);
                    setSelectedFolderId(ws.id);
                  }}
                  className="cursor-pointer focus:bg-zinc-800"
                >
                  <Folder className="h-3.5 w-3.5 mr-2 text-amber-400" />{" "}
                  {ws.name}
                </DropdownMenuItem>
              ))}
              <div className="border-t border-zinc-800 my-1" />
              <DropdownMenuItem
                onClick={openWorkspaceModal}
                className="cursor-pointer text-amber-400 focus:bg-zinc-800"
              >
                <Plus className="h-3.5 w-3.5 mr-2" /> New Workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Breadcrumb  */}
          <Breadcrumbs
            currentFolder={currentFolder ?? null}
            activeWorkspaceId={activeWorkspaceId}
            items={items}
            setSelectedFolderId={setSelectedFolderId}
          />
        </div>

        {/* Create Folder / File */}
        <div className="flex gap-2 shrink-0 py-3 ">
          <Button
            size="sm"
            onClick={() => openCreateModal("folder")}
            className="bg-white/10 hover:bg-white/20 cursor-pointer text-white backdrop-blur-md border border-white/20 text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> New Folder
          </Button>
          <Button
            size="sm"
            onClick={() => openCreateModal("file")}
            className="bg-white/10 hover:bg-white/20 cursor-pointer text-white backdrop-blur-md border border-white/20 text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> New File
          </Button>
        </div>
      </div>

      {/* Display & Editor */}
      <DisplayItems
        currentFolderContents={currentFolderContents}
        handleItemClick={handleItemClick}
        activeFile={activeFile ?? null}
        openRenameModal={openRenameModal}
        deleteWorkspace={deleteWorkspace}
        isDirty={isDirty}
        saveFile={saveFile}
        setOpenFileId={setOpenFileId}
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        setIsDirty={setIsDirty}
      />

      {/* Folder / File / Rename Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={modalTitle}
        inputValue={modalName}
        onInputChange={setModalName}
        placeholder={modalPlaceholder}
        submitLabel={itemToRename ? "Save" : "Create"}
        onSubmit={itemModalSubmit}
      />

      {/* Workspace Creation Modal */}
      <CustomModal
        isOpen={isWorkspaceModalOpen}
        onOpenChange={setIsWorkspaceModalOpen}
        title="Create New Workspace"
        inputValue={workspaceName}
        onInputChange={setWorkspaceName}
        placeholder="e.g., Workspace / Personal"
        submitLabel="Create Workspace"
        onSubmit={workspaceModalSubmit}
      />
    </div>
  );
};

export default Screen;
