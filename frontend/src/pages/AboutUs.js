import React, { useContext } from "react";
import abhinavImage from "./abhinav.png";
import pradeepImage from "./pradeep.png";
import dummyImage from "./dummy.JPG";
import { Link } from "react-router-dom";
import { UserContext } from "../middlewares/User-state";
const AboutUs = () => {
  const { data } = useContext(UserContext);
  console.log(data);
  const teamMembers = [
    {
      name: "Abhinav Shakya",
      role: "Founder & CEO",
      bio: "Abhinav is a passionate gamer and the visionary behind our eSports portal. He is dedicated to creating a platform that connects gamers from all over the world.",
      image: abhinavImage, // Add the image URL here
    },
    {
      name: "Pradeep Lama",
      role: "Lead Developer",
      bio: "Pradeep is an experienced developer with a love for gaming. He is responsible for bringing our platform to life and ensuring a seamless user experience.",
      image: pradeepImage, // Add the image URL here
    },
    // Add more team members as needed
  ];

  const testimonials = [
    {
      name: "Milan Khatri",
      testimonial: "I love this eSports portal! It has a great community and lots of exciting events. The coaches are also very helpful and knowledgeable.",
      image: dummyImage,
    },
    {
      name: "Atisha Shrestha",
      testimonial: "This platform is amazing! I've learned so much from the coaches and made many new friends. It's a must-join for any gaming enthusiast.",
      image: dummyImage,
    },
    // Add more testimonials as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="py-10 bg-teal-500 text-white text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Welcome to eSports Portal</h1>
          <p className="mt-4 text-xl">We are passionate about gaming and eSports!</p>
          <br></br>
          <p className="text-lg mb-8">Become a part of the exciting world of eSports.</p>
          {data?.signed_user?.isLoggedIn ? (
            <Link to="/post">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md">Get Started</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md">Get Started</button>
            </Link>
          )}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Forum Feature */}
            <div className="bg-blue-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Forum</h3>
              <p className="text-gray-800">Engage with the gaming community in our interactive forums.</p>
            </div>

            {/* Coach Feature */}
            <div className="bg-green-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Coach</h3>
              <p className="text-gray-800">Get personalized coaching from experienced eSports players.</p>
            </div>

            {/* Updates Feature */}
            <div className="bg-yellow-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Updates</h3>
              <p className="text-gray-800">Stay up-to-date with the latest eSports news and event updates.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-center mb-4">
                  <img src={member.image} alt={member.name} className="w-55 h-60 rounded-full mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <p className="text-gray-800">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600">Verified User</p>
                  </div>
                </div>
                <p className="text-gray-800">{testimonial.testimonial}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 text-center">
        <p>© 2023 eSports Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
