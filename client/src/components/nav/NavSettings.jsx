//
import { IoSettingsOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import {BsArrowUpSquare} from "react-icons/bs"
//

export const NavSettings = () => {
  return (
    <div className="w-[350px]">
      <div className="md:flex gap-11 items-center">
        <span>
            <button className="btn btn-outline">
                <BsArrowUpSquare size={27} />
            </button>
        </span>
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
    </div>
  );
};
