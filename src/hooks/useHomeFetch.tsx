import { useState, useEffect } from "react";
import API from "../API";
import { Movie } from "./useMovieFetch";

type Movies = {
  page: number;
  results: Movie[];
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
  const [movieSearch, setMovieSearch] = useState<string>("");
  const [movies, setMovies] = useState<Movies>(initialMoviesState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const fetchMovies = async (page: number, searchTerm: string = "") => {
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
    setMovies(initialMoviesState);
    fetchMovies(1, movieSearch);
  }, [movieSearch]);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(movies.page + 1, movieSearch);
    setIsLoadingMore(false);
  }, [isLoadingMore, movieSearch, movies.page]);

  return {
    movies,
    loading,
    error,
    movieSearch,
    setMovieSearch,
    setIsLoadingMore,
  };
};
