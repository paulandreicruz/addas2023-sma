import error from "../../assets/gif/error.gif";
import { NavLink } from "react-router-dom";
import { Modes } from "../../style/Modes";
import { IoReturnDownBackSharp } from "react-icons/io5";

export const Error = () => {
  return (
    <div className="h-screen font-roboto">
      <Modes />
      <div className="justify-center flex py-6">
        <div>
          <img src={error} className="mask mask-squircle w-80 h-80" />
        </div>
      </div>
      <div>
        <div>
          <p className="mb-2 text-2xl font-bold text-center md:text-3xl">
            <span className="text-red-500">Oops!</span>{" "}
            <span className="">Page not found</span>
          </p>
          <p className="mb-4 text-center md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <NavLink to="/">
          <button className="btn font-roboto text-xl bg-sky-700 w-36 rounded-full">
            Go Back <IoReturnDownBackSharp />
          </button>
        </NavLink>
      </div>
    </div>
  );
};
