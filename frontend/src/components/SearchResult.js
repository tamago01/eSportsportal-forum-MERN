import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PostsCard from "../components/Home/PostsCard";
import ChipInput from "material-ui-chip-input";
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }
const SearchResults = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // const debounce = (func, delay) => {
  //   let timer;
  //   return function (...args) {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func(...args), delay);
  //   };
  // };
  const timerRef = useRef();
  useEffect(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setSearchQuery(search);
    }, 1000);
    // setLoading(false);
    return () => clearTimeout(timerRef.current);
  }, [search]);
  useEffect(() => {
    if (search === "") {
      return;
    }
    setLoading(true);
  }, [search]);
  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/post/search?searchQuery=${searchQuery}`);
      console.log(response.data.data);
      setPosts(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // const debouncedFetchSearchResults = debounce(fetchSearchResults, 1000);
  useEffect(() => {
    console.log(search);
    // Make an API call to the backend route to fetch search results
    // 500ms delay
    if (search === "") {
      setPosts([]);
      return;
    }
    // debouncedFetchSearchResults();
    fetchSearchResults();
  }, [searchQuery]);
  useEffect(() => {
    // console.log(posts);
  }, [posts]);
  // const handleAddChip = (tag) => setTags([...tags, tag]);

  // const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div>
      <input type="text" placeholder="Enter search query" onChange={(e) => setSearch(e.target.value)} value={search} />
      {/* <ChipInput style={{ margin: "10px 0" }} value={tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} label="Search Tags" variant="outlined" /> */}
      {/* {!loading
        ? posts
          ? posts.map((post) => {
              return <PostsCard key={post?._id} post={post} />;
            })
          : ""
        : null} */}
      {loading ? (
        <h1>Loading</h1>
      ) : (
        posts.map((post) => {
          return <PostsCard key={post?._id} post={post} />;
        })
      )}
    </div>
  );
};

export default SearchResults;
