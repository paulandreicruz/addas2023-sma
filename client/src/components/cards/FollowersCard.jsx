//
import { MockFollowers } from "../../data/followers/mockData";

export const FollowersCard = () => {
  return (
    <div className="">
      <span>
        Who to follow
      </span>
      {MockFollowers.map((follower, index) => {
        return (
          <div className="mt-2" key={index}>
            <div className="md:flex mx-auto py-2 px-4 gap-3">
              <span>{follower.name}</span>
              <span>{follower.username}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
