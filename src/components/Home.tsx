import React, { useState, useEffect } from "react";
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
import API from "../API";

import NoImage from "../images/no_images.jpg";

type Movies = {
  page: number;
  results: { [key: string]: string | number | boolean | number[] }[];
  total_pages: number;
  total_results: number;
};

const Home = () => {
  const [movies, setMovies] = useState<Movies | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchMovie = async (page: number, searchTerm: string = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      setMovies((prev) => ({
        ...movies,
        results:
          prev && page > 1
            ? [...prev.results, ...movies.results]
            : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovie(1);
  }, []);

  console.log(movies);

  return <div>Home Page</div>;
};

export default Home;
