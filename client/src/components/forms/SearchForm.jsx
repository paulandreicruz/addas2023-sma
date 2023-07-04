import { CiSearch } from "react-icons/ci";

export const SearchForm = () => {
  return (
    <form>
      <CiSearch className="w-6 h-10 absolute ml-3 pointer-events-none" />
      <input
        type="search"
        placeholder="Search"
        autoComplete="on"
        className="pl-10 py-2 pr-3 rounded-3xl w-auto bg-base-300"
      />
    </form>
  );
};
