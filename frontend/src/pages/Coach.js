import React from "react";

import { useParams } from "react-router-dom";

import Footer from "../components/Footer";
import CreateCommunity from "../components/Home/CreateCommunity";
import CoachCard from "../components/Coach/CoachCard";

const Coach = () => {
  const params = useParams();

  return (
    <div className="w-full dark:text-white">
      <div className="w-full flex justify-center ">
        <div className="w-full md:w-4/5 flex flex-col md:flex-row items-center md:items-start md:space-x-7 space-y-4 md:space-y-0  my-[5vh] justify-center ">
          <div className="w-5/6 md:max-w-3xl md:w-4/6 flex flex-col  items-center">
            <CoachCard id={params.id} />
          </div>
          <div className="w-5/6 md:max-w-sm md:w-2/6 flex flex-col space-y-4 justify-center mb-[5vh] px-2">
            <CreateCommunity />
            <div className="sr-only md:not-sr-only">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;
// import React from "react";
// import { useParams } from "react-router-dom";
// import Footer from "../components/Footer";
// import CreateCommunity from "../components/Home/CreateCommunity";
// import CoachCard from "../components/Coach/CoachCard";

// const Coach = () => {
//   const params = useParams();

//   return (
//     <div className="w-full dark:text-white">
//       <div className="w-full flex justify-center ">
//         <div className="w-full md:w-4/5 grid grid-cols-1 md:grid-cols-2 gap-4 my-[5vh] justify-center">
//           <div className="w-full flex flex-col items-center">
//             <CoachCard id={params.id} />
//           </div>
//           <div className="w-full flex flex-col items-center">
//             <CreateCommunity />
//           </div>
//         </div>
//       </div>
//       <div className="w-full md:hidden">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Coach;
