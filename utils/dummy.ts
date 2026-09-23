import { WorkSpaceType } from "@/types/type";

const now = Date.now();

export const demoWorkSpaceData: WorkSpaceType[] = [
  {
    id: "root",
    name: "Workspace",
    type: "folder",
    parentId: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "projects",
    name: "Projects",
    type: "folder",
    parentId: "root",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "webbly",
    name: "Webbly",
    type: "folder",
    parentId: "projects",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "notes",
    name: "notes.txt",
    type: "file",
    parentId: "webbly",
    content:
      "Workspace Explorer:\n- Frontend: Next.js, React, and Tailwind CSS\n- Storage: React Query + IndexedDB",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "tasks",
    name: "tasks.txt",
    type: "file",
    parentId: "webbly",
    content:
      "[x] Design layout\n[x] Implement IndexedDB\n[ ] Add workspace search",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "personal",
    name: "Personal",
    type: "folder",
    parentId: "projects",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "documents",
    name: "Documents",
    type: "folder",
    parentId: "root",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "readme",
    name: "README.txt",
    type: "file",
    parentId: "root",
    content:
      "Welcome to Mini Workspace Explorer! All data is persisted locally in your browser via IndexedDB.",
    createdAt: now,
    updatedAt: now,
  },
];
