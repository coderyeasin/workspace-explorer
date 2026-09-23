"use client";

import { WorkSpaceType } from "@/types/type";
import { Button } from "@/components/ui/button";
import { FileText, Save, X } from "lucide-react";

export interface CustomTextEditorProps {
  activeFile: WorkSpaceType;
  isDirty: boolean;
  handleSaveFile: () => Promise<void> | void;
  setOpenFileId: (id: string | null) => void;
  editorContent: string;
  setEditorContent: (content: string) => void;
  setIsDirty: (isDirty: boolean) => void;
}

const CustomTextEditor = ({
  activeFile,
  isDirty,
  handleSaveFile,
  setOpenFileId,
  editorContent,
  setEditorContent,
  setIsDirty,
}: CustomTextEditorProps) => {
  return (
    <div className="w-1/2 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-xl flex flex-col overflow-hidden text-white shadow-2xl">
      {/* Editor Top Bar */}
      <div className="p-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-semibold">{activeFile.name}</span>
          {isDirty && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
              Unsaved
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleSaveFile}
            disabled={!isDirty}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7 px-2"
          >
            <Save className="h-3 w-3 mr-1" /> Save
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              if (isDirty && !confirm("Discard unsaved changes?")) return;
              setOpenFileId(null);
            }}
            className="h-7 w-7 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Input Area */}
      <textarea
        value={editorContent}
        onChange={(e) => {
          setEditorContent(e.target.value);
          setIsDirty(true);
        }}
        className="flex-1 p-4 font-mono text-xs bg-transparent focus:outline-none resize-none leading-relaxed text-zinc-200"
        placeholder="Start typing file content..."
      />
    </div>
  );
};

export default CustomTextEditor;
