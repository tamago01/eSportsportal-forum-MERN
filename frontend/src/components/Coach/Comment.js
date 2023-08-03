import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatTimeSinceCreation } from "../../middlewares/User-state";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../middlewares/User-state";

const Comment = ({ comment }) => {
  const { data } = useContext(UserContext);
  // const [currentPost, setCurrentPost] = useState(null);
  // const navigate = useNavigate();
  const deleteCoachComment = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch(`http://localhost:4000/deleteCoachComment`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          coachid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          window.location.reload();
        });
    } else {
    }
  };

  return (
    <div className="flex space-x-1 w-full dark:bg-slate-700 p-2 border-b-2">
      <div className="w-10 min-w-fit flex">
        <Link to={`/user/${comment.author._id}`}>
          <img src={comment.author.avatar} alt="" className="w-8 h-8 rounded-full" />
        </Link>
      </div>
      <div className="max-w-md bg-semilight dark:bg-slate-800 px-2 py-1 rounded-md -space-y-4-">
        <Link to={`/user/${comment.author._id}`}>
          <p className="text-lg font-semibold leading-3 hover:text-blue-400 hover:underline">{comment.author.username}</p>
        </Link>
        <span className="break-all text-sm">{comment.content}</span>
      </div>
      <div className="w-2/12 min-w-fit">
        <p className="text-slate-400 text-sm">{formatTimeSinceCreation(comment.createdAt)} </p>
        {data.signed_user._id === comment.author._id || data.signed_user.userType === "admin" ? <DeleteIcon onClick={() => deleteCoachComment(comment._id, comment.content)} /> : null}
      </div>
    </div>
  );
};

export default Comment;
