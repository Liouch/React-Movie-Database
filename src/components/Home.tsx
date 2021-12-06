import React, { useState, useEffect } from "react";
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
import { useHomeFetch } from "../hooks/useHomeFetch";

import NoImage from "../images/no_images.jpg";
import HeroImage from "./HeroImage/HeroImage";

const Home = () => {
  const { movies, loading, error } = useHomeFetch();
  console.log(movies);

  return (
    <>
      {movies.results[0] && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
          title={movies.results[0].original_title}
          text={movies.results[0].overview}
        />
      )}
    </>
  );
};

export default Home;
