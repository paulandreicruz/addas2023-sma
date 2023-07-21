//
import { IoSettingsOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsArrowUpSquare } from "react-icons/bs";
import { TrendsCard } from "../cards/TrendsCard";
//

export const NavSettings = () => {
  return (
    <div className="w-[350px] mr-7">
      <div className="md:flex gap-11 items-center justify-between">
        <div className="">
        <span>
          <button id="customScroll" className="btn btn-outline">
            <BsArrowUpSquare size={27} />
          </button>
        </span>
        </div>
        <span className="hover:cursor-pointer">
          <IoNotificationsOutline size={28} />
        </span>
        <span className="hover:cursor-pointer">
          <FiMessageSquare size={28} />
        </span>
        <span className="hover:cursor-pointer">
          <IoSettingsOutline size={28} />
        </span>
      </div>
      <div className="md:block">
        <TrendsCard />
      </div>
    </div>
  );
};
