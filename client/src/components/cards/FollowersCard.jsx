//
import { MockFollowers } from "../../data/followers/mockData";
import { FollowAvatar } from "../avatar/FollowAvatar";
import { FollowButton } from "../button/FollowButton";
//
import { SlUserFollow } from "react-icons/sl";

export const FollowersCard = () => {
  return (
    <div className="">
      <div className="md:flex items-center justify-center">
        <div className="font-roboto mr-4">Who to follow</div>
        <div>
          <SlUserFollow size={20} className="" />
        </div>
      </div>

      {MockFollowers.map((follower, index) => {
        return (
          <div
            className="my-6 text-sm md:flex items-center justify-between"
            key={index}
          >
            <FollowAvatar avatar={follower.img} />
            <div className="hover:cursor-pointer">
              <p className="text-xs">@{follower.username}</p>
              <p>{follower.name}</p>
            </div>
            <div className="">
              <FollowButton />
            </div>
          </div>
        );
      })}
    </div>
  );
};
