import { useState, useEffect } from "react";
import API from "../API";

export type Movie = {
  [key: string]: {} | string | number | boolean | number[] | [];
  backdrop_path: string;
  original_title: string;
  overview: string;
  id: string;
  runtime: number;
  budget: number;
  revenue: number;
  /* directors: {
    adult: boolean;
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
  }[]; */
};

type Credits = {
  cast: {
    [key: string]: number | string | boolean;
  }[];
  crew: {
    [key: string]: number | string | boolean;
    job: string;
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
        console.log(movieData);
        console.log(credits);

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
    fetchMovie();
  }, [movieId]);

  return { movie, loading, error };
};
