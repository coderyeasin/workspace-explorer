import { WorkSpaceType } from "@/types/type";
import Dexie, { EntityTable } from "dexie";
import { demoWorkSpaceData } from "./dummy";

// create DB
const db = new Dexie("UbuntuWorkspaceDB") as Dexie & {
  items: EntityTable<WorkSpaceType, "id">;
};

// schema & index
db.version(1).stores({
  items: "id, name, type, parentId",
});

export const initialDB = async () => {
  const dataCount = await db.items.count();
  if (dataCount === 0) {
    await db.items.bulkAdd(demoWorkSpaceData);
  }
};

export { db };
