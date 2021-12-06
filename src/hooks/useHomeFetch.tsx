import { useState, useEffect, useRef } from "react";
import API from "../API";

type Movies = {
  page: number;
  results: { [key: string]: string | number | boolean | number[] }[];
  total_pages: number;
  total_results: number;
};

const initialMoviesState: Movies = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [movies, setMovies] = useState<Movies>(initialMoviesState);
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

  return { movies, loading, error };
};
