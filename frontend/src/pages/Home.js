import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../middlewares/User-state";
import axios from "axios";
import { Button } from "@material-ui/core";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import ChipInput from "material-ui-chip-input";
import PostsCard from "../components/Home/PostsCard";
import CreatePost from "../components/Home/CreatePost";
import Footer from "../components/Footer";
import CreateCommunity from "../components/Home/CreateCommunity";
import Loading from "../components/loading";
import SearchResults from "../components/SearchResult";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dummyImage from "./dummy.JPG";
const Home = () => {
  const testimonials = [
    {
      name: "DRS GAMING",
      testimonial: "Nepal PUBG teams places 11th on PMWI 2023. They valiantly showed their skills in the international stage and won 3 crores.",
      image: dummyImage,
    },
    {
      name: "Team Tantra",
      testimonial: "Young enthusiasts who have been striving in the DotA scene of Nepal are going to Huangzhou to represent Nepal in the international scene.",
      image: dummyImage,
    },
    {
      name: "4Merical eSports",
      testimonial: "There has been a roster change in the 4Merical eSports team. IGN-Hunter is switching from the offlane position to the midlane position.",
      image: dummyImage,
    },
    {
      name: "Team Liquid",
      testimonial: "Team Liquid clutch the game against Talon eSports. It was a base race which was very exciting and unexpected. They continue their upper bracket run.",
      image: dummyImage,
    },
    {
      name: "Team Phoenix",
      testimonial: "Team Phoenix dominates the CS:GO tournament, securing a flawless victory in the grand finals. Their tactical gameplay was commendable.",
      image: dummyImage,
    },
    {
      name: "Divine Unity",
      testimonial: "Divine Unity, the newly formed Valorant squad, showcased exceptional synergy and coordination during their debut tournament.",
      image: dummyImage,
    },
    {
      name: "Frostfire",
      testimonial: "Frostfire's League of Legends team made an incredible comeback, winning a crucial game with a stunning team fight near Baron pit.",
      image: dummyImage,
    },
    {
      name: "Rising Legends",
      testimonial: "Rising Legends' Free Fire squad proved their mettle in the regional championship, securing multiple Booyahs and emerging as champions.",
      image: dummyImage,
    },
  ];
  const { data } = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(null);
  const [search, setSearch] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  // const [results, setResults] = useState([]);
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
  const [tags, setTags] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`http://localhost:4000/api/post/`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, [data]);
  // useEffect(() => {
  //   // Make an API call to the backend route to fetch search results
  //   const fetchSearchResults = async () => {
  //     try {
  //       const response = await axios.get(`/api/posts/search?searchQuery=${searchQuery}`);
  //       setResults(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (searchQuery !== "") {
  //     fetchSearchResults();
  //   }
  // }, [searchQuery]);

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  return (
    <React.Fragment>
      <section className="py-16 bg-teal-500">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Updates</h2>
          <div className="slick-container">
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="border-1 ">
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      {/* <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" /> */}
                      <div>
                        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
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
      <div className="w-full dark:text-white bg-white">
        <div className="w-full flex justify-center bg-white">
          <div className="w-full md:w-4/5 flex flex-col md:flex-row items-center md:items-start md:space-x-7 space-y-4 md:space-y-0  my-[5vh] justify-center bg-white">
            <div className="w-5/6 md:max-w-3xl md:w-4/6 flex flex-col  items-center">
              {/* <FaSearch style={{ fontSize: "1rem" }} /> */}
              {/* <input className="border-none focus:ring-0 py-1" type="text" id="search" placeholder="Search Forum" onChange={(e) => setSearch(e.target.value)} /> */}
              {/* <ChipInput style={{ margin: "10px 0" }} value={tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} label="Search Tags" variant="outlined" /> */}
              <CreatePost />
              {/* <div>
              <input type="text" placeholder="Enter search query" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
              {results.length > 0 ? (
                <ul>
                  {results.map((post) => (
                    <li key={post._id}>{post.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No results found.</p>
              )}
            </div> */}
              {!loading ? (
                posts ? (
                  posts.map((post) => {
                    return <PostsCard key={post?._id} post={post} />;
                  })
                ) : (
                  ""
                )
              ) : (
                <Loading />
              )}
            </div>
            <div className="w-5/6 md:max-w-sm min-w-[] md:w-2/6 flex flex-col space-y-4 justify-center mb-[5vh]">
              <SearchResults />
              <div className="sr-only md:not-sr-only"></div>
            </div>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 text-center">
        <p>© 2023 eSports Portal. All rights reserved.</p>
      </footer>
    </React.Fragment>
  );
};

export default Home;
