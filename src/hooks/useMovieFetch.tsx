import { useState, useEffect } from "react";
import API from "../API";
import { isPersistedState } from "../helpers";

export type Movie = {
  backdrop_path: string;
  original_title: string;
  overview: string;
  id: string;
  runtime: number;
  budget: number;
  revenue: number;
  actors: {
    credit_id: string;
    name: string;
    profile_path: string;
    character: string;
  }[];
  directors: Credits["crew"];
  poster_path: string;
  title: string;
  vote_average: string;
};

type Credits = {
  cast: {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
  }[];
  crew: {
    adult: false;
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
  }[];
};

export const useMovieFetch = (movieId: string | undefined) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movieData: Movie = await API.fetchMovie(movieId);
        const credits: Credits = await API.fetchCredits(movieId);

        // get directors only
        const directors = credits.crew.filter(
          (member) => member.job === "Director"
        );
        if (movieData) {
          setMovie({
            ...movieData,
            actors: credits.cast,
            directors,
          });
        }

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    const sessionState = isPersistedState(movieId);

    if (sessionState) {
      setMovie(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    if (movieId) sessionStorage.setItem(movieId, JSON.stringify(movie));
  }, [movieId, movie]);

  return { movie, loading, error };
};
