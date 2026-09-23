"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useWorkspaceState } from "@/hooks/useWorkspaceState";
import { Folder, FileText } from "lucide-react";
import { useWorkspaceQuery } from "@/hooks/useWorkspaceQuery";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const { getAllDataFromDB: items } = useWorkspaceQuery();
  const { setActiveWorkspaceId, setSelectedFolderId, setOpenFileId } =
    useWorkspaceState();

  const searchResults = query.trim()
    ? items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  // Finds top-level workspace ID for any item
  const getWorkspaceRootId = (itemId: string): string => {
    let current = items.find((i) => i.id === itemId);
    while (current) {
      if (current.parentId === null) return current.id;
      current = items.find((i) => i.id === current?.parentId);
    }
    return "root";
  };

  return (
    <Field className="relative w-full flex justify-center items-center">
      <ButtonGroup className="flex justify-center text-black w-full max-w-xl">
        <Input
          id="input-button-group"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xl bg-white shadow-none border-none focus-visible:right-0 focus-visible:outline-none focus-visible:border-none"
          placeholder="Type to search..."
        />
        <Button variant="outline" className="cursor-pointer bg-white">
          Search
        </Button>
      </ButtonGroup>

      {/* Real-time Search Dropdown */}
      {query.trim() !== "" && (
        <div className="absolute top-full mt-2 w-full max-w-xl bg-white border border-zinc-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto p-1 text-black text-sm">
          {searchResults.length === 0 ? (
            <div className="p-3 text-xs text-zinc-500 text-center">
              No matching files or folders
            </div>
          ) : (
            searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  const targetWorkspaceId = getWorkspaceRootId(item.id);
                  setActiveWorkspaceId(targetWorkspaceId);

                  if (item.type === "folder") {
                    setSelectedFolderId(item.id);
                  } else {
                    setSelectedFolderId(item.parentId ?? targetWorkspaceId);
                    setOpenFileId(item.id);
                  }
                  setQuery("");
                }}
                className="flex items-center justify-between p-2 hover:bg-zinc-100 rounded cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  {item.type === "folder" ? (
                    <Folder className="h-4 w-4 text-amber-500 shrink-0" />
                  ) : (
                    <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                  )}
                  <span className="font-medium truncate">{item.name}</span>
                </div>
                <span className="text-[10px] text-zinc-400 capitalize">
                  {item.type}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </Field>
  );
};

export default SearchBox;
