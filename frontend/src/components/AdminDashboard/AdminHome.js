import React, { useEffect, useState } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import axios from "axios";
const AdminHome = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [updatedUserType, setUpdatedUserType] = useState("");
  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);
  const [coach, setCoach] = useState([]);
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    getAllUser();
    getAllPost();
    getAllCoach();
    getAllMessage();
  }, []);

  const handleUserTypeUpdate = async () => {
    try {
      // Make a request to the backend to update the user type
      const response = await axios.post("http://localhost:4000/updateUserType", {
        userId: selectedUser._id,
        userType: updatedUserType,
      });

      // Handle the response and show success/failure message to the user
      console.log(response.data);
      alert(response.data.data);

      // Update the user type in the local state immediately after successful update
      setData((prevData) => {
        return prevData.map((user) => {
          if (user._id === selectedUser._id) {
            return { ...user, userType: updatedUserType };
          } else {
            return user;
          }
        });
      });
      setIsEditMode(false);
      setSelectedUser(null);
    } catch (error) {
      console.log(error);
      alert("Failed to update user type. Please try again later.");
    }
  };
  const getAllMessage = () => {
    fetch("http://localhost:4000/getAllMessage", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userData");
        setMessage(data.data);
      });
  };
  const getAllUser = () => {
    fetch("http://localhost:4000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userData");
        setData(data.data);
      });
  };
  const getAllPost = () => {
    fetch("http://localhost:4000/getAllPost", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "postData");
        setPost(data.data);
      });
  };
  const getAllCoach = () => {
    fetch("http://localhost:4000/getAllCoach", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "coachData");
        setCoach(data.data);
      });
  };
  const deleteMessage = (id, username) => {
    if (window.confirm(`Are you sure you want to delete ${username}`)) {
      fetch("http://localhost:4000/deleteMessage", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          messageid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllMessage();
        });
    } else {
    }
  };
  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:4000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
  };
  const deletePost = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:4000/deletePost", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          postid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllPost();
        });
    } else {
    }
  };
  const deleteCoach = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:4000/deleteCoach", {
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
          getAllCoach();
        });
    } else {
    }
  };
  const handleEditUser = (user) => {
    setSelectedUser(user);
    // Here you can show a dialog/modal to edit the userType or simply update the userType state
    setUpdatedUserType(user.userType);
    setIsEditMode(true); // Enable edit mode
  };

  return (
    <React.Fragment>
      <div className="my-4">
        <Typography variant="h2" align="center">
          Welcome to Admin Dashboard!
        </Typography>
        <hr className="border-none border-t-4 border-black my-5" />
        <div className="my-4">
          {/* User Management */}
          {/* ... (existing code) */}
          <Typography variant="h3" align="center">
            User Management
          </Typography>
          <div className="flex justify-center items-center my-4">
            {/* ... (existing code) */}
            <input
              className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-500 text-center"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search For User"
            />
          </div>
          <div className="mx-auto w-full md:w-3/4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Follwers
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Following
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      UserType
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data
                    .filter((i) => (search.toLowerCase() === "" ? i : i.name.toLowerCase().includes(search)))
                    .map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
                        <td>{user.followers?.length}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user?.followings?.length}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {selectedUser && selectedUser._id === user._id ? (
                            <React.Fragment>
                              <select
                                value={updatedUserType}
                                onChange={(e) => setUpdatedUserType(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-center"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="coach">Coach</option>
                                {/* Add other user types as needed */}
                              </select>
                              <Button variant="contained" color="primary" onClick={handleUserTypeUpdate}>
                                Save
                              </Button>
                            </React.Fragment>
                          ) : (
                            user.userType
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {selectedUser && selectedUser._id === user._id ? null : ( // Buttons for Edit mode // Don't render anything for Edit mode
                            // Button for View mode
                            <Button variant="contained" color="primary" onClick={() => handleEditUser(user)}>
                              Edit
                            </Button>
                          )}
                          &nbsp;&nbsp;&nbsp;
                          <Button variant="contained" color="secondary" onClick={() => deleteUser(user._id, user.name)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br></br>
        {/* Post Management */}
        <Typography variant="h3" align="center">
          Post Management
        </Typography>
        <div className="flex justify-center items-center my-4">
          <Link to="/create">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Create Post</button>
          </Link>
          <div className="relative ml-4">
            <input
              className="pl-12 pr-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-500 text-center"
              type="text"
              onChange={(e) => setSearch1(e.target.value)}
              placeholder="Search For Posts"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14h4m1 0h1m1 0h1m-4-4h4m1 0h1m1 0h1m-4-4h4m1 0h1m1 0h1m-9 9h4m1 0h1m1 0h1m-4-4h4m1 0h1m1 0h1" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full md:w-3/4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CreatedAt
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PostName
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {post
                  .filter((i) => (search1?.toLowerCase() === "" ? i : i.title?.toLowerCase()?.includes(search1)))
                  .map((i, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.tags.toString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.createdAt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.comments.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="contained" color="secondary" onClick={() => deletePost(i._id, i.title)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <br></br>

        {/* Coach Management */}
        <Typography variant="h3" align="center">
          Coach Management
        </Typography>
        <div className="flex justify-center items-center my-4">
          <Link to="/createcoach">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Create Coach</button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <input
            className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-500 text-center"
            type="text"
            onChange={(e) => setSearch2(e.target.value)}
            placeholder="Search For Coach"
          />
        </div>
        <div className="mx-auto w-full md:w-3/4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Votes
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CoachName
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coach
                  .filter((i) => (search2?.toLowerCase() === "" ? i : i.title?.toLowerCase()?.includes(search2)))
                  .map((i, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.tags.toString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.votes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.comments?.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="contained" color="secondary" onClick={() => deleteCoach(i._id, i.title)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Message */}
        <br></br>
        <Typography variant="h3" align="center">
          Message Management
        </Typography>
        <div className="flex justify-center items-center my-4">
          <div className="mx-auto w-full md:w-3/4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {message.map((i, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i.createdAt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="contained" color="secondary" onClick={() => deleteMessage(i._id, i.username)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminHome;
