import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../middlewares/User-state";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { MdOutlineArrowDropDown, MdMenu } from "react-icons/md";
import ChipInput from "material-ui-chip-input";
import UserSetting from "../components/Modals/UserSetting";
import Icon from "../components/Icon";
import SearchResults from "./SearchResult";
import Loading from "../components/loading";

const Navbar = () => {
  const { data } = useContext(UserContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to handle mobile menu visibility
  const history = useNavigate();

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <nav className="bg-white dark:bg-slate-700 dark:text-white p-4 md:px-10 lg:px-16">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10">
            <Icon />
          </div>
          <div className="text-2xl font-bold">
            <Link to="/">
              <span className="text-primary dark:text-white">eSports</span>
              <span className="text-secondary">Portal</span>
            </Link>
          </div>
        </div>
        <div className="hidden md:block ">
          {/* Add any additional navigation links for larger screens */}
          <Link to="/coach" className="ml-12 hover:text-teal-500">
            View Coaches
          </Link>
          <Link to="/post" className="ml-12 hover:text-teal-500 ">
            View Forum
          </Link>
          <Link to="/" className="ml-12 hover:text-teal-500 ">
            About
          </Link>
          <Link to="/feedback" className="ml-12 hover:text-teal-500 ">
            Write to us
          </Link>
          {data.isLoggedIn && data?.signed_user?.userType == "admin" ? (
            <Link to="/admin" className="ml-12 hover:text-teal-500 ">
              Admin Dashboard
            </Link>
          ) : null}
          {data.isLoggedIn && data?.signed_user?.userType !== "admin" ? (
            <Link to={`/user/${data.signed_user?._id}`} className="ml-12 hover:text-teal-500">
              View Profile
            </Link>
          ) : null}
          {data.isLoggedIn && data?.signed_user?.userType === "coach" ? (
            <Link to={`/requests`} className="ml-12 hover:text-teal-500">
              View Requests
            </Link>
          ) : null}
        </div>
        <div className="hidden md:block">
          {/* Render user profile button if logged in */}
          {data.isLoggedIn ? (
            <div className="relative cursor-pointer select-none" onClick={() => setIsModalActive(!isModalActive)}>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10">
                  {data.signed_user.avatar ? (
                    <img src={data.signed_user.avatar} alt="" className="w-full h-full rounded-full" />
                  ) : (
                    <div className="text-3xl flex items-center justify-center rounded-full bg-primary text-white">
                      <FaUserCircle />
                    </div>
                  )}
                </div>
                <div>
                  <h6>{data.signed_user.name}</h6>
                  <h6 className="text-slate-400 text-sm">{data.signed_user.username}</h6>
                </div>
                <div className="flex items-center text-3xl">
                  <MdOutlineArrowDropDown />
                </div>
              </div>
              {isModalActive && <UserSetting />}
            </div>
          ) : (
            // Render login button if not logged in
            <Link to="/login">
              <button className="border-2 border-primary dark:bg-white dark:text-black px-3 font-semibold rounded-md cursor-pointer hover:bg-primary hover:text-white">Login</button>
            </Link>
          )}
        </div>
        {/* Add a hamburger menu for mobile screens */}
        <div className="md:hidden flex items-center">
          <button className="text-3xl text-primary dark:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <MdMenu />
          </button>
        </div>
      </div>
      {/* Add mobile menu here (hidden by default) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 p-2 bg-white dark:bg-slate-700 dark:text-white">
          {/* ... (existing code) */}
          <Link to="/coach" className="block py-2 hover:text-teal-500 dark:hover:text-white transition-colors">
            View Coaches
          </Link>
          <Link to="/" className="block py-2 hover:text-teal-500 dark:hover:text-white transition-colors">
            View Forum
          </Link>
          <Link to="/about" className="block py-2 hover:text-teal-500 dark:hover:text-white transition-colors">
            About
          </Link>
          <Link to="/feedback" className="block py-2 hover:text-teal-500 dark:hover:text-white transition-colors">
            Write to us
          </Link>
          {data.isLoggedIn && data?.signed_user?.userType == "admin" && (
            <Link to="/admin" className="block py-2 hover:text-teal-500 dark:hover:text-white transition-colors">
              Admin Dashboard
            </Link>
          )}
          {data.isLoggedIn && data?.signed_user?.userType !== "admin" && (
            <Link to={`/user/${data.signed_user?._id}`} className="block py-2 block py-2 hover:text-primary dark:hover:text-white transition-colors">
              View Profile
            </Link>
          )}
          {!data.isLoggedIn && (
            <Link to="/login" className="block py-2">
              <button className="border-2 border-primary dark:bg-white dark:text-black px-3 font-semibold rounded-md cursor-pointer hover:bg-primary hover:text-white">Login</button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
