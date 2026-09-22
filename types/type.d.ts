export type ContentType = "folder" | "file";

export type WorkSpaceType = {
  id: string;
  name: string;
  type: ContentType;
  parentId?: string | null;
  content?: string;
  createdAt: number;
  updatedAt: number;
};
