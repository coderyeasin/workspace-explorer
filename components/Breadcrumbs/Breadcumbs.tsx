import React from "react";

import { handleBreadcrumbs } from "@/utils/handler";
import { BreadcrumbsType } from "@/types/type";

const Breadcrumbs = ({
  currentFolder,
  activeWorkspaceId,
  items,
  setSelectedFolderId,
}: BreadcrumbsType) => {
  return (
    <nav className="flex items-center gap-1 text-xs text-white/80 overflow-x-auto scrollbar-hide">
      {handleBreadcrumbs({
        currentFolder,
        activeWorkspaceId,
        items,
      }).map((crumb, idx, arr) => (
        <div key={crumb.id} className="flex items-center">
          {idx > 0 && <span className="mx-1 text-white/40">/</span>}
          <button
            onClick={() => setSelectedFolderId(crumb.id)}
            className={`hover:underline rounded px-1 ${
              idx === arr.length - 1 ? "font-bold text-amber-300" : "text-white"
            }`}
          >
            {crumb.name}
          </button>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
