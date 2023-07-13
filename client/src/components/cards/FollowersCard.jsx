//
import { MockFollowers } from "../../data/followers/mockData";

export const FollowersCard = () => {
  return (
    <div className="">
      <span className="font-roboto text-sm">
        Who to follow
      </span>
      {MockFollowers.map((follower, index) => {
        return (
          <div className="mt-2 text-sm md:flex " key={index}>
            <div className="py-2 gap-3">
              <p className="">{follower.img}</p>
            </div>
            <div className="">
              <p>{follower.username}</p>
              <p>{follower.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
