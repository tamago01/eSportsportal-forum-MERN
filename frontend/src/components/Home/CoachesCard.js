import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../middlewares/User-state";
import axios from "axios";
import { MdArrowDropDown, MdArrowDropUp, MdComment } from "react-icons/md";
import { formatTimeSinceCreation } from "../../middlewares/User-state";

const CoachesCard = ({ coach }) => {
  const navigate = useNavigate();
  const { data } = useContext(UserContext);
  const [currentCoach, setCurrentCoach] = useState(coach);

  const updateVotes = async (action) => {
    const author = data.signed_user._id;
    if (coach) {
      switch (action) {
        case "upvote": {
          axios
            .put(`http://localhost:4000/api/coach/${currentCoach._id}/upvote`, { author })
            .then((res) => setCurrentCoach(res.data))
            .catch((err) => console.log(err));
          break;
        }
        case "downvote": {
          axios
            .put(`http://localhost:4000/api/coach/${currentCoach._id}/downvote`, { author })
            .then((res) => setCurrentCoach(res.data))
            .catch((err) => console.log(err));
          break;
        }
        default: {
          return;
        }
      }
    }
  };

  return (
    <div className="post-card flex dark:text-white">
      <div className="flex flex-col justify-center items-center mr-2 text-5xl select-none">
        <div className="cursor-pointer hover:text-primary dark:hover:text-slate-400 -m-4" onClick={() => updateVotes("upvote")}>
          <MdArrowDropUp />
        </div>
        <p className="text-lg">{currentCoach?.votes}</p>
        <div className="cursor-pointer hover:text-primary dark:hover:text-slate-400 -m-4" onClick={() => updateVotes("downvote")}>
          <MdArrowDropDown />
        </div>
      </div>
      <div className="flex flex-col shadow-lg bg-white dark:bg-slate-700 rounded-xl w-3/4 pr-4 my-4 md:w-3/5 lg:w-2/5" onClick={() => navigate(`/coach/${currentCoach?._id}`)}>
        <div
          className="h-60 ml-2 mt-2 md:h-80 lg:h-30 w-full rounded-t-xl md:rounded-l-xl bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${currentCoach.image})`, backgroundSize: "cover" }}
        ></div>
        <div className="flex flex-col justify-between py-4 px-4 md:py-2 w-full">
          <div className="mb-2">
            <h3 className="text-xl font-semibold line-clamp-2">{currentCoach?.title}</h3>
            <div className="space-x-2 mt-2">
              {currentCoach.tags?.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2 items-center">
              <img src={currentCoach.author?.avatar} alt="" className="w-10 h-10 rounded-full" />
              <div className="text-sm">
                <p className="">{currentCoach.author?.username}</p>
                <p className="text-slate-600 dark:text-slate-400">{formatTimeSinceCreation(currentCoach?.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <MdComment className="text-slate-600 dark:text-slate-400 mr-1" />
              <p>{currentCoach.comments?.length} Comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachesCard;
