import React, { useState, useEffect } from "react";
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
import { useHomeFetch } from "../hooks/useHomeFetch";

import NoImage from "../images/no_images.jpg";

const Home = () => {
  const { movies, loading, error } = useHomeFetch();
  console.log(movies);

  return <div>Home Page</div>;
};

export default Home;
