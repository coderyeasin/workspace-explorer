import { ContentType, WorkSpaceType } from "@/types/type";
import { db, initialDB } from "@/utils/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const query_key = ["workspace", "items"];

export const useWorkspaceDB = () => {
  const queryClient = useQueryClient();

  //================ getAll data
  const getWorkspaceData = useQuery({
    queryKey: query_key,
    queryFn: async () => {
      await initialDB();
      const allItems = await db.items.toArray();

      const contentItems: Record<string, WorkSpaceType> = {};
      allItems.forEach((item) => {
        contentItems[item.id] = item;
      });
      return contentItems;
    },
  });

  const invalidateQuery = () =>
    queryClient.invalidateQueries({ queryKey: query_key });

  //============ create new folder or file
  const createWorkspaceFileORFolder = useMutation({
    mutationFn: async ({
      name,
      type,
      parentId,
      content = "",
    }: {
      name: string;
      type: ContentType;
      parentId: string;
      content?: string;
    }) => {
      //empty name file/folder
      const trimmedName = name.trim();
      if (!trimmedName) throw new Error("name cannot be empty");

      // duplicate name in same parent
      const duplicateName = await db.items
        .where("parentId")
        .equals(parentId)
        .toArray();
      const isDuplicate = duplicateName.some(
        (item) => item.name.toLowerCase() === trimmedName.toLowerCase(),
      );
      if (isDuplicate) {
        throw new Error(
          `This name ${trimmedName} is already exists in this folder`,
        );
      }

      //   create new data
      const createdTime = Date.now();
      const newItem: WorkSpaceType = {
        id: `${trimmedName.charAt(5).toLowerCase()}`,
        name: trimmedName,
        type,
        parentId,
        content: type === "file" ? content : undefined,
        createdAt: createdTime,
        updatedAt: createdTime,
      };
      await db.items.add(newItem);
      return newItem;
    },
    onSuccess: invalidateQuery,
  });

  // ============ update / edit

  const updateFileContent = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      await db.items.update(id, {
        content,
        updatedAt: Date.now(),
      });
    },
    onSuccess: invalidateQuery,
  });

  return {
    isLoading: getWorkspaceData.isLoading,
    createNewItemIntoDB: createWorkspaceFileORFolder.mutateAsync,
    updateAContentIntoDB: updateFileContent.mutateAsync,
    getAllDataFromDB: getWorkspaceData.data ?? {},
  };
  // hooks block
};
