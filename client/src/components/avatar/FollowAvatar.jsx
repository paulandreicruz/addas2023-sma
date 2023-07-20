import React from "react";

export const FollowAvatar = ({ avatar }) => {
  return (
    <div className="avatar">
      <div className="w-12 rounded-full ring ring-offset-base-300 ring-offset-2 hover:cursor-pointer">
        <img src={avatar} />
      </div>
    </div>
  );
};
