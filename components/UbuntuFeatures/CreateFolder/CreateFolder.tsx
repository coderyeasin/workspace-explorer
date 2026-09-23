"use client";

import { useWorkspaceDB } from "@/hooks/useWorkspace";
import { WorkSpaceType } from "@/types/type";
import { useState, useMemo, useEffect } from "react";

export function WorkspaceExplorer() {
  // const {
  //   getAllDataFromDB,
  //   isLoading,
  //   createNewItemIntoDB,
  //   renameItem,
  //   updateAContentIntoDB,
  //   deleteItem,
  // } = useWorkspaceDB();
  const {
    getAllDataFromDB,
    isLoading,
    createNewItemIntoDB,
    updateAContentIntoDB,
  } = useWorkspaceDB();

  // Workspace Navigation State
  const [selectedFolderId, setSelectedFolderId] = useState<string>("root");
  const [openFileId, setOpenFileId] = useState<string | null>("readme");
  const [expandedFolderIds, setExpandedFolderIds] = useState<string[]>([
    "root",
    "projects",
    "webbly",
  ]);

  // Search & Editor Local State
  const [searchQuery, setSearchQuery] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const activeFile = openFileId ? getAllDataFromDB[openFileId] : null;

  // Sync editor content when active file changes
  useEffect(() => {
    if (activeFile) {
      setEditorContent(activeFile.content ?? "");
      setIsDirty(false);
    }
  }, [openFileId, activeFile?.content]);

  // Fallback if currently selected folder gets deleted
  useEffect(() => {
    if (!getAllDataFromDB[selectedFolderId] && selectedFolderId !== "root") {
      setSelectedFolderId("root");
    }
    if (openFileId && !getAllDataFromDB[openFileId]) {
      setOpenFileId(null);
    }
  }, [getAllDataFromDB, selectedFolderId, openFileId]);

  // Compute Breadcrumb Trail
  const breadcrumbs = useMemo(() => {
    const trail: WorkSpaceType[] = [];
    let currentId: string | null = selectedFolderId;

    while (currentId && getAllDataFromDB[currentId]) {
      const item = getAllDataFromDB[currentId];
      trail.unshift(item);
      currentId = item.parentId;
    }

    return trail;
  }, [selectedFolderId, getAllDataFromDB]);

  // Compute Workspace Global Search Results
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return Object.values(getAllDataFromDB).filter((item) =>
      item.name.toLowerCase().includes(query),
    );
  }, [searchQuery, getAllDataFromDB]);

  // Handlers
  const toggleFolderExpand = (id: string) => {
    setExpandedFolderIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleCreate = async (type: "folder" | "file") => {
    const name = prompt(
      `Enter new ${type} name:`,
      type === "file" ? "new-file.txt" : "New Folder",
    );
    if (!name) return;

    try {
      const created = await createNewItemIntoDB({
        name,
        type,
        parentId: selectedFolderId,
        content: type === "file" ? "" : undefined,
      });

      if (type === "file") setOpenFileId(created.id);
      if (!expandedFolderIds.includes(selectedFolderId)) {
        setExpandedFolderIds((prev) => [...prev, selectedFolderId]);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // const handleRename = async (item: WorkSpaceType) => {
  //   const newName = prompt("Rename item:", item.name);
  //   if (!newName || newName === item.name) return;

  //   try {
  //     await renameItem({ id: item.id, newName });
  //   } catch (err: any) {
  //     alert(err.message);
  //   }
  // };

  // const handleDelete = async (item: WorkSpaceType) => {
  //   const confirmMsg =
  //     item.type === "folder"
  //       ? `Are you sure you want to delete "${item.name}" and all of its contents?`
  //       : `Delete file "${item.name}"?`;

  //   if (!confirm(confirmMsg)) return;

  //   if (item.id === selectedFolderId) {
  //     setSelectedFolderId(item.parentId ?? "root");
  //   }
  //   if (item.id === openFileId) {
  //     setOpenFileId(null);
  //   }

  //   await deleteItem(item.id);
  // };

  const handleSaveFile = async () => {
    if (!openFileId) return;
    await updateAContentIntoDB({ id: openFileId, content: editorContent });
    setIsDirty(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-zinc-500">Initializing Workspace...</div>
    );
  }

  const currentFolderItems = Object.values(getAllDataFromDB).filter(
    (i) => i.parentId === selectedFolderId,
  );

  return (
    <div className="flex h-screen bg-white text-zinc-800 text-sm overflow-hidden border">
      {/* 1. SIDEBAR (TREE VIEW) */}
      <div className="w-64 border-r bg-zinc-50 flex flex-col justify-between">
        <div className="p-3 overflow-y-auto">
          <div className="font-bold text-zinc-700 mb-3 flex items-center justify-between">
            <span>Explorer</span>
            <span className="text-xs font-normal text-zinc-400">IndexedDB</span>
          </div>

          <SidebarTree
            parentId={null}
            getAllDataFromDB={getAllDataFromDB}
            expandedFolderIds={expandedFolderIds}
            selectedFolderId={selectedFolderId}
            openFileId={openFileId}
            onSelectFolder={(id) => {
              setSelectedFolderId(id);
              if (!expandedFolderIds.includes(id)) toggleFolderExpand(id);
            }}
            onOpenFile={setOpenFileId}
            onToggleFolder={toggleFolderExpand}
          />
        </div>
      </div>

      {/* 2. MAIN PANEL */}
      <div className="flex-1 flex flex-col">
        {/* Topbar / Global Search / Breadcrumbs */}
        <div className="border-b p-3 flex items-center justify-between gap-4 bg-white">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1 text-xs overflow-x-auto">
            {breadcrumbs.map((item, index) => (
              <div key={item.id} className="flex items-center">
                {index > 0 && <span className="mx-1 text-zinc-400">/</span>}
                <button
                  onClick={() => setSelectedFolderId(item.id)}
                  className={`hover:underline rounded px-1 py-0.5 ${
                    item.id === selectedFolderId
                      ? "font-semibold text-blue-600"
                      : "text-zinc-600"
                  }`}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </nav>

          {/* Global Workspace Search Input */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search workspace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2.5 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {/* Search Dropdown Results */}
            {searchQuery && (
              <div className="absolute right-0 top-8 w-72 bg-white border rounded shadow-lg z-50 max-h-60 overflow-y-auto p-1">
                {searchResults.length === 0 ? (
                  <div className="p-2 text-xs text-zinc-400">
                    No matching items found
                  </div>
                ) : (
                  searchResults.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => {
                        if (res.type === "folder") {
                          setSelectedFolderId(res.id);
                        } else {
                          setSelectedFolderId(res.parentId ?? "root");
                          setOpenFileId(res.id);
                        }
                        setSearchQuery("");
                      }}
                      className="p-1.5 hover:bg-zinc-100 rounded cursor-pointer text-xs flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span>{res.type === "folder" ? "📁" : "📄"}</span>
                        <span className="font-medium">{res.name}</span>
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {getAllDataFromDB[res.parentId ?? ""]?.name ?? "Root"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Split (Folder Grid + File Editor) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Active Folder View */}
          <div className="flex-1 p-4 overflow-y-auto border-r">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base flex items-center gap-2">
                📂 {getAllDataFromDB[selectedFolderId]?.name ?? "Folder"}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCreate("file")}
                  className="px-2.5 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                >
                  + New File
                </button>
                <button
                  onClick={() => handleCreate("folder")}
                  className="px-2.5 py-1 bg-zinc-700 text-white rounded text-xs hover:bg-zinc-800"
                >
                  + New Folder
                </button>
              </div>
            </div>

            {/* Empty Folder Edge Case */}
            {currentFolderItems.length === 0 ? (
              <div className="p-8 text-center border border-dashed rounded-lg text-zinc-400 text-xs">
                This folder is empty. Create a file or folder above to get
                started.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {currentFolderItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.type === "folder") {
                        setSelectedFolderId(item.id);
                      } else {
                        setOpenFileId(item.id);
                      }
                    }}
                    className="group border rounded-lg p-3 hover:border-blue-400 hover:shadow-sm cursor-pointer flex flex-col justify-between transition-all bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">
                        {item.type === "folder" ? "📁" : "📄"}
                      </span>
                      <div className="hidden group-hover:flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // handleRename(item);
                          }}
                          className="text-zinc-400 hover:text-zinc-700 p-1 text-xs"
                          title="Rename"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // handleDelete(item);
                          }}
                          className="text-zinc-400 hover:text-red-600 p-1 text-xs"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div
                      className="font-medium text-xs truncate"
                      title={item.name}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. TEXT FILE EDITOR */}
          {activeFile && (
            <div className="w-1/2 flex flex-col bg-zinc-50 border-l">
              <div className="p-3 border-b bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-xs">
                    📄 {activeFile.name}
                  </span>
                  {isDirty && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">
                      Unsaved
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveFile}
                    disabled={!isDirty}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      isDirty
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      if (isDirty && !confirm("Discard unsaved changes?"))
                        return;
                      setOpenFileId(null);
                    }}
                    className="text-zinc-400 hover:text-zinc-700 text-xs px-1"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <textarea
                value={editorContent}
                onChange={(e) => {
                  setEditorContent(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Start typing your notes here..."
                className="flex-1 p-4 font-mono text-xs bg-zinc-50 focus:outline-none resize-none leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Recursive Sidebar Tree Sub-Component
function SidebarTree({
  parentId,
  getAllDataFromDB,
  expandedFolderIds,
  selectedFolderId,
  openFileId,
  onSelectFolder,
  onOpenFile,
  onToggleFolder,
}: {
  parentId: string | null;
  getAllDataFromDB: Record<string, WorkSpaceType>;
  expandedFolderIds: string[];
  selectedFolderId: string;
  openFileId: string | null;
  onSelectFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
  onToggleFolder: (id: string) => void;
}) {
  const items = Object.values(getAllDataFromDB).filter(
    (i) => i.parentId === parentId,
  );
  if (items.length === 0) return null;

  return (
    <ul className="pl-2 space-y-0.5 border-l border-zinc-200 ml-1">
      {items.map((item) => {
        const isFolder = item.type === "folder";
        const isExpanded = expandedFolderIds.includes(item.id);
        const isSelected = selectedFolderId === item.id;
        const isOpenFile = openFileId === item.id;

        return (
          <li key={item.id} className="text-xs">
            <div
              className={`flex items-center gap-1.5 p-1 rounded cursor-pointer transition-colors ${
                isSelected ? "bg-blue-100 font-semibold text-blue-900" : ""
              } ${isOpenFile ? "bg-zinc-200 font-semibold" : "hover:bg-zinc-100"}`}
              onClick={() => {
                if (isFolder) {
                  onSelectFolder(item.id);
                } else {
                  onOpenFile(item.id);
                }
              }}
            >
              {isFolder && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFolder(item.id);
                  }}
                  className="text-[10px] text-zinc-400 w-3 text-center"
                >
                  {isExpanded ? "▼" : "▶"}
                </button>
              )}
              <span>{isFolder ? (isExpanded ? "📂" : "📁") : "📄"}</span>
              <span className="truncate">{item.name}</span>
            </div>

            {isFolder && isExpanded && (
              <SidebarTree
                parentId={item.id}
                getAllDataFromDB={getAllDataFromDB}
                expandedFolderIds={expandedFolderIds}
                selectedFolderId={selectedFolderId}
                openFileId={openFileId}
                onSelectFolder={onSelectFolder}
                onOpenFile={onOpenFile}
                onToggleFolder={onToggleFolder}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
