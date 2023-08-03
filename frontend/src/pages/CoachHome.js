import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../middlewares/User-state";
import axios from "axios";
import { Grid } from "@material-ui/core";
import CoachesCard from "../components/Home/CoachesCard";
import CreateCoach from "../components/Home/CreateCoach";
import Footer from "../components/Footer";
import CoachCommunity from "../components/Home/CoachCommunity";
import Loading from "../components/loading";
import { makeStyles } from "@material-ui/core/styles";
import CreateCommunity from "../components/Home/CreateCommunity";
import dummyImage from "./dummy.JPG";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  {
    name: "Jiwan Lama",
    testimonial: "This platform is incredible! The supportive community and well-organized events make it stand out. The coaches provide valuable insights and tips.",
    image: dummyImage,
  },
  {
    name: "John Shakya",
    testimonial: "Being a part of this eSports platform has been a game-changer for me. I've improved my skills, and the friendly atmosphere makes it a joy to participate.",
    image: dummyImage,
  },
  {
    name: "Samantha Rai",
    testimonial: "As a casual gamer, I was hesitant at first, but this platform welcomed me with open arms. It's a treasure trove of knowledge and camaraderie.",
    image: dummyImage,
  },
  {
    name: "Suresh Tamang",
    testimonial: "I never thought I'd find such a supportive and fun gaming community. The tournaments are thrilling, and I've honed my gameplay significantly.",
    image: dummyImage,
  },
  {
    name: "Priya Limbu",
    testimonial: "This is the go-to place for eSports enthusiasts. The variety of games and friendly competitions have rekindled my passion for gaming.",
    image: dummyImage,
  },
  {
    name: "Rahul Gupta",
    testimonial: "The coaches here genuinely care about your progress. They've helped me identify my weaknesses and work on them, boosting my confidence.",
    image: dummyImage,
  },
];

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "90rem",
  },
  gridItem: {
    marginRight: "-260px",
  },
}));

const Home = () => {
  const { data } = useContext(UserContext);
  const [coaches, setCoaches] = useState(null);
  const [loading, setLoading] = useState(null);
  const classes = useStyles();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`http://localhost:4000/api/coach/`)
        .then((res) => setCoaches(res.data))
        .catch((err) => console.log(err));
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, [data]);

  return (
    <React.Fragment>
      <section className="py-16 bg-teal-500">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="slick-container">
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="border-1">
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                        <p className="text-gray-600">Verified User</p>
                      </div>
                    </div>
                    <p className="text-gray-800">{testimonial.testimonial}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <div className="w-full dark:text-white bg-white-100">
        <div className="w-full flex justify-center">
          <div className="w-full md:w-4/5 flex flex-col md:flex-row items-center md:items-start md:space-x-7 space-y-4 md:space-y-0 my-[5vh] justify-center">
            <div className="w-5/6 md:max-w-3xl md:w-5/6 flex flex-col items-center">{data?.signed_user?.userType === "Admin" && <CreateCoach />}</div>
          </div>
        </div>
        <div className="w-full md:w-3/5 flex flex-col md:flex-row items-center md:items-start md:space-x-7 space-y-2 md:space-y-0 my-[1vh] justify-center"></div>
        <div className="w-3/4 flex flex-col items-center my-[-10vh] mx-[49vh]">
          <Grid container spacing={0} className={classes.gridContainer}>
            {coaches?.map((coach) => (
              <Grid item key={coach._id} xs={12} sm={6} md={4} lg={7} className={classes.gridItem}>
                <CoachesCard coach={coach} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      {/* ...Rest of the code remains unchanged... */}
    </React.Fragment>
  );
};

export default Home;
