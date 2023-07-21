import lebron from "../../assets/pictures/lebron.png";

export const ProfileCard = () => {
  return (
      <div className="card w-auto font-roboto bg-inherit glass shadow-lg shadow-sky-300 border-current hover:-translate-y-1 hover:scale-110 duration-300 ">
        <figure className="">
          <img
            src={lebron}
            alt=""
            className="rounded-full w-24 h-24 mt-3 mb-2 border border-gray-500"
          />
        </figure>
        <div className="card-body p-2">
          <p className="card-title flex justify-center">Lebron James</p>
          <p className="text-sm">SOFTWARE DEVELOPER</p>
          <div className="card-actions flex justify-evenly py-3">
            <div>
              <p className="font-bold">6000</p>
              <p className="text-xs">Followers</p>
            </div>
            <div className="">
              <p className="font-bold">7000</p>
              <p className="text-xs">Following</p>
            </div>
          </div>
        </div>
      </div>
  );
};
