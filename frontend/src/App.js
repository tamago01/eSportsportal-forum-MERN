import { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContext, initialState, reducer } from "./middlewares/User-state";
import Protected from "./middlewares/Protected";
import SemiProtected from "./middlewares/SemiProtected";

import Landing from "./pages/Landing";
import Login from "./components/Landing/Login";
import Register from "./components/Landing/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CoachHome from "./pages/CoachHome";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import User from "./pages/User";
import AdminHome from "./components/AdminDashboard/AdminHome";
import CreateCoach from "./pages/CreateCoach";
import Coach from "./pages/Coach";
import SearchResults from "./components/SearchResult";
import Message from "./pages/Message";
import AboutUs from "./pages/AboutUs";
import Khalti from "./Khalti";
import Confirm from "./Confirm";
import Requests from "./components/Requests/Requests";
function App() {
  const [userData, dispatch] = useReducer(reducer, initialState);
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ data: userData, dispatch: dispatch }}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Landing />}>
            <Route path="" element={<Login />} />
          </Route>
          <Route path="/register" element={<Landing />}>
            <Route path="" element={<Register />} />
          </Route>

          <Route path="/khalti/confirm" element={<SemiProtected Component={Confirm} />} />
          <Route path="/khalti" element={<SemiProtected Component={Khalti} />} />
          <Route path="/x" element={<SemiProtected Component={Khalti} />} />
          <Route path="/post" element={<SemiProtected Component={Home} />} />
          <Route path="/create" element={<Protected Component={CreatePost} />} />
          <Route path="/post/:id" element={<SemiProtected Component={Post} />} />
          <Route path="/user/:id" element={<SemiProtected Component={User} />} />
          <Route path="/coach" element={<SemiProtected Component={CoachHome} />} />
          <Route path="/feedback" element={<SemiProtected Component={Message} />} />
          <Route path="/" element={<SemiProtected Component={AboutUs} />} />
          <Route path="/createcoach" element={<Protected Component={CreateCoach} />} />
          <Route path="/coach/:id" element={<SemiProtected Component={Coach} />} />
          <Route path="/search" element={<SemiProtected Component={SearchResults} />} />
          <Route path="/requests" element={<SemiProtected Component={Requests} />} />
          <Route path="/admin" exact Component={AdminHome} />

          {/* <Route path="/coaches" exact Component={CoachHome} />
          <Route path="/coaches/search" exact Component={CoachHome} />
          <Route path="/coaches/:id" exact Component={CoachDetails} /> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
