// import React, { useState } from "react";
// import axios from "axios";

// const EditProfileModal = ({ user, onClose, onUpdateProfile }) => {
//   const [name, setName] = useState(user.name);
//   const [email, setEmail] = useState(user.email);
//   const [avatar, setAvatar] = useState(null); // State to hold the selected avatar image

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "name") {
//       setName(value);
//     } else if (name === "email") {
//       setEmail(value);
//     }
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     setAvatar(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     if (avatar) {
//       formData.append("avatar", avatar);
//     }

//     try {
//       // Send the updated profile data to the backend
//       const response = await axios.put(`http://localhost:4000/api/user/edit/${user._id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // Update the user's data on the frontend
//       onUpdateProfile(response.data);
//       onClose(); // Close the modal after submission
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to update profile.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white dark:bg-slate-700 rounded-md shadow-lg p-4 w-96">
//         <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
//               Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">
//               Avatar:
//             </label>
//             <input
//               type="file"
//               id="avatar"
//               name="avatar"
//               accept="image/*"
//               onChange={handleAvatarChange}
//               className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
//               Cancel
//             </button>
//             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               Update Profile
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const EditProfileModal = ({ user, onClose, onUpdateProfile }) => {
  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("authToken");

  const handleFileInputChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      if (avatar) {
        formData.append("avatar", avatar);
      }
      if (currentPassword && newPassword) {
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);
      }

      const res = await axios.put(`http://localhost:4000/api/user/edit-profile/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      onUpdateProfile(res.data);
      setLoading(false);
      onClose();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Current Password */}
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="block text-gray-700 font-medium mb-2">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileInputChange}
              className="form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="btn-secondary mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
