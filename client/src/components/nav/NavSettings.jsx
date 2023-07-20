//
import { IoSettingsOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
//

export const NavSettings = () => {
  return (
    <div className="w-[350px] text-center">
      <div className="md:flex justify-between mr-7">
        <span>
            UP SCROLL
        </span>
        <span>
          <IoNotificationsOutline size={28} />
        </span>
        <span>
          <FiMessageSquare size={28} />
        </span>
        <span>
          <IoSettingsOutline size={28} />
        </span>
      </div>
    </div>
  );
};
