//
import { ProfileCard } from "../components/cards/ProfileCard";
import { SearchForm } from "../components/forms/SearchForm";

//
import logo from "../assets/pictures/logo.png";
import { FollowersCard } from "../components/cards/FollowersCard";

export const Home = () => {
  return (
    <>
      <div className="md:flex">
        <div className="hidden md:block md:max-w-[300px] font-roboto ml-7 mb-5 items-center">
          <div className="md:flex items-center">
            <div className="text-center">
              <img src={logo} alt="" className="w-12" />
            </div>
            <div className="text-center">
              <SearchForm />
            </div>
          </div>
          <div className="text-center font-roboto font-medium mt-5">
            <ProfileCard />
          </div>
          <div className="text-center font-roboto mt-5">
            <FollowersCard />
          </div>
        </div>
        <div className="md:flex-1 mx-auto">
          <div className="text-center">
              <p>TIMELINE POST</p>
          </div>
        </div>
        <div className="md:flex hidden">
          RIGHT SIDE SETTINGS
        </div>
      </div>
    </>
  );
};
