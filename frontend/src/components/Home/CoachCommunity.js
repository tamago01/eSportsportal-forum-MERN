import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../middlewares/User-state";

const CoachCommunity = () => {
  const { data } = useContext(UserContext);
  console.log(data);

  return (
    <div className="w-full bg-white dark:bg-slate-700 p-4 rounded-md shadow-lg">
      <div className="border-b-2 border-white pb-4">
        <div className="my-1">
          <h1 className="text-2xl">Home</h1>
        </div>
        <div className="my-1">
          <p className="text-slate-500 dark:text-slate-300">Your personal eSports Forum frontpage. Here we discuss about the latest eSports news and events.</p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 mt-5">
        <Link to="/create">
          <button className="w-full sideBtn bg-white text-black hover:bg-slate-200">Create Post</button>
        </Link>
        {data?.signed_user?.userType == "Admin" ? (
          <Link to="/createcoach">
            <button className="w-full sideBtn bg-semilight text-black hover:bg-slate-200">Create Coach</button>
          </Link>
        ) : (
          <Link to="/coach">
            <button className="w-full sideBtn bg-white text-black hover:bg-slate-200">View Coach</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CoachCommunity;
