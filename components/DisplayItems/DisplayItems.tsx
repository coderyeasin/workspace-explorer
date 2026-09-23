import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Folder, FileText, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import CustomTextEditor from "@/Shared/CustomTextEditor";
import { IDisplayItems } from "@/types/type";

const DisplayItems = ({
  currentFolderContents,
  handleItemClick,
  activeFile,
  openRenameModal,
  deleteWorkspace,
  isDirty,
  saveFile,
  setOpenFileId,
  editorContent,
  setEditorContent,
  setIsDirty,
}: IDisplayItems) => {
  return (
    <div className="flex-1 flex overflow-hidden mt-4 gap-4">
      <div className="flex-1 overflow-y-auto pr-2">
        {currentFolderContents.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl p-6 text-center text-white/60">
            <Folder className="h-12 w-12 mb-2 text-white/30" />
            <p className="text-sm font-medium">This folder is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currentFolderContents.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="group relative flex flex-col items-center justify-between p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl backdrop-blur-md transition-all cursor-pointer select-none"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-white hover:bg-white/20"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent
                      align="end"
                      className="bg-zinc-900 border-zinc-800 text-white z-50"
                    >
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          openRenameModal(item);
                        }}
                      >
                        <Edit2 className="h-3.5 w-3.5 mr-2" /> Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWorkspace(item);
                        }}
                        className="text-red-400 focus:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="my-2">
                  {item.type === "folder" ? (
                    <Folder className="h-10 w-10 text-amber-400" />
                  ) : (
                    <FileText className="h-10 w-10 text-blue-300" />
                  )}
                </div>

                <p
                  className="text-xs font-medium truncate w-full text-center"
                  title={item.name}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Text Editor */}
      {activeFile && (
        <CustomTextEditor
          activeFile={activeFile}
          isDirty={isDirty}
          handleSaveFile={saveFile}
          setOpenFileId={setOpenFileId}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          setIsDirty={setIsDirty}
        />
      )}
    </div>
  );
};

export default DisplayItems;
