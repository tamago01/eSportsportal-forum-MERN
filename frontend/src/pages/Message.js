import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../middlewares/User-state";
import FeedBackImage from "./feedback.png";
const Message = () => {
  const { data } = useContext(UserContext);
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send feedback to the backend using Axios or fetch
      await axios.post("http://localhost:4000/feedback", { message: feedback, author: data.signed_user._id, username: data.signed_user.username });
      alert("Thank you for your feedback!");
      setFeedback("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <section className="py-10 bg-teal-500 text-white text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Write a feedback</h1>
          <p className="mt-4 text-xl">Your feedbacks to our site will help us make improvements and more features.</p>
          <br></br>
          <p className="text-lg mb-8">Help us make eSportsPortal better and bigger!!!</p>
        </div>
      </section>
      <div className="w-full dark:text-white bg-white-400">
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="bg-white shadow-md rounded px-12 pt-12 pb-20 w-400">
            <img
              src={FeedBackImage} // Replace with the correct image path
              alt="Feedback"
              className="w-65 h-60 mx-20 mb-12"
            />
            <h2 className="text-2xl font-bold mb-4">Your feedback is highly appreciated!</h2>

            <form onSubmit={handleSubmit}>
              {/* Label */}
              <label htmlFor="feedback" className="block text-gray-699 text-xl font-bold mb-4">
                Please leave your feedback here:
              </label>

              <div className="mb-4">
                <textarea
                  id="feedback"
                  rows="7"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                  placeholder="Enter your feedback..."
                  value={feedback}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>© 2023 eSports Portal. All rights reserved.</p>
      </footer>
    </React.Fragment>
  );
};

export default Message;
