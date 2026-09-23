import { todayDate } from "@/utils/constrains";
import { Power, Volume2, Wifi } from "lucide-react";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center py-1 px-3">
      <div className="flex items-center gap-7">
        <p className="text-sm cursor-pointer">Activities</p>
        {/* <p className="text-sm cursor-pointer">open folder name</p> */}
      </div>
      <div>{todayDate}</div>
      <div className="flex items-center gap-3">
        <Wifi className="cursor-pointer" size={16} />
        <Volume2 className="cursor-pointer" size={16} />
        <Power className="cursor-pointer" size={16} />
      </div>
    </div>
  );
};

export default TopBar;
