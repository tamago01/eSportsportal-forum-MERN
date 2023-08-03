// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { UserContext } from "./User-state";

// const Protected = ({ Component }) => {
//   const { data, dispatch } = useContext(UserContext);
//   const navigate = useNavigate();
//   let headers;
//   const token = Cookies.get("authToken");
//   useEffect(() => {
//     headers = { Authorization: `Bearer ${token}` };

//     async function fetchData() {
//       await axios
//         .get(`http://localhost:4000/api/user/me`, { headers })
//         .then((res) => {
//           dispatch({ type: "set_user", payload: res.data });
//           dispatch({ type: "login_status", payload: true });
//         })
//         .catch((err) => {
//           console.log(err);
//           navigate("/login");
//         });
//     }
//     fetchData();
//   }, [token]);

//   return <Component />;
// };

// export default Protected;
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "./User-state";

const Protected = ({ Component }) => {
  const { data, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const token = Cookies.get("authToken");

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`http://localhost:4000/api/user/me`, { headers });
        dispatch({ type: "set_user", payload: response.data });
        dispatch({ type: "login_status", payload: true });
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    }
    fetchData();
  }, [token, dispatch, navigate]);

  return <Component />;
};

export default Protected;
