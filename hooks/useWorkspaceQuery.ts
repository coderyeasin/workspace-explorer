import { ContentType, WorkSpaceType } from "@/types/type";
import { db, initialDB } from "@/utils/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["workspace", "items"];

export const useWorkspaceQuery = () => {
  const queryClient = useQueryClient();
  const invalidateQuery = () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  //================ getAll data
  const getWorkspaceData = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      await initialDB();
      return await db.items.toArray();

      //   const contentItems: Record<string, WorkSpaceType> = {};
      //   allItems.forEach((item) => {
      //     contentItems[item.id] = item;
      //   });
      //   return contentItems;
    },
  });

  // ====================Create new workspace
  const createWorkspaceMutation = useMutation({
    mutationFn: async (workspaceName: string) => {
      const newName = workspaceName.trim();
      if (!newName) throw new Error("Workspace name cannot be empty.");

      const allItems = await db.items.toArray();
      const isDuplicate = allItems.some(
        (i) =>
          i.parentId === null && i.name.toLowerCase() === newName.toLowerCase(),
      );

      if (isDuplicate)
        throw new Error(`Workspace "${newName}" already exists.`);

      const now = Date.now();
      const newWorkspace: WorkSpaceType = {
        id: `${newName.toLowerCase()}`,
        name: newName,
        type: "folder",
        parentId: null,
        createdAt: now,
        updatedAt: now,
      };

      await db.items.add(newWorkspace);
      return newWorkspace;
    },
    onSuccess: invalidateQuery,
  });

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
      const newName = name.trim();
      if (!newName) throw new Error("name cannot be empty");

      // duplicate name in same parent
      const duplicateName = await db.items
        .where("parentId")
        .equals(parentId)
        .toArray();
      const isDuplicate = duplicateName.some(
        (item) => item.name.toLowerCase() === newName.toLowerCase(),
      );
      if (isDuplicate) {
        throw new Error(
          `This name ${newName} is already exists in this folder`,
        );
      }

      //   create new data
      const createdTime = Date.now();
      const newItem: WorkSpaceType = {
        id: `${newName.toLowerCase()}`,
        name: newName,
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

  // ================== re-name file / folder
  const renameWorkSpace = useMutation({
    mutationFn: async ({ id, newName }: { id: string; newName: string }) => {
      const changeName = newName.trim();
      if (!changeName) throw new Error("Should have a name");

      const item = await db.items.get(id);
      if (!item) throw new Error("not found");

      if (item.parentId) {
        const checkIds = await db.items
          .where("parentId")
          .equals(item.parentId)
          .toArray();
        const isDuplicate = checkIds.some(
          (s) =>
            s.id !== id && s.name.toLowerCase() === changeName.toLowerCase(),
        );
        if (isDuplicate) {
          throw new Error(`"${changeName}" is already exists`);
        }
      }
      await db.items.update(id, { name: changeName, updatedAt: Date.now() });
    },
    onSuccess: invalidateQuery,
  });

  // =============== delete file / folder
  const deleteWorkspace = useMutation({
    mutationFn: async (id: string) => {
      const allItems = await db.items.toArray();

      const getIds = (targetId: string): string[] => {
        const ids = allItems.filter((id) => id.parentId === targetId);
        return ids.flatMap((c) => [c.id, ...getIds(c.id)]);
      };

      const idsToDelete = [id, ...getIds(id)];
      await db.items.bulkDelete(idsToDelete);
    },
    onSuccess: invalidateQuery,
  });

  return {
    isLoading: getWorkspaceData.isLoading,
    getAllDataFromDB: getWorkspaceData.data ?? [],
    createNewItemIntoDB: createWorkspaceFileORFolder.mutateAsync,
    updateAContentIntoDB: updateFileContent.mutateAsync,
    createNewWorkSpace: createWorkspaceMutation.mutateAsync,
    renameWorkSpace: renameWorkSpace.mutateAsync,
    deleteWorkspace: deleteWorkspace.mutateAsync,
  };
};
