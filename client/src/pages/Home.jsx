import { SearchForm } from "../components/forms/SearchForm";

export const Home = () => {
  return (
    <div className="flex justify-between pt-3 pl-8 pr-8 mx-auto items-center">
      <div className="flex gap-4 items-center">
        <div className="px-3 ">Icon</div>
        <div className="px-3">
          <SearchForm />
        </div>
      </div>
      <div>Middle</div>
      <div className="">
        <div>Right</div>
      </div>
    </div>
  );
};
