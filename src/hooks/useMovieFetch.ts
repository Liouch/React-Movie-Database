import { useState, useEffect } from "react";
import API, { Credits, Movie } from "../API";
import { isPersistedState } from "../helpers";

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
    const sessionState = isPersistedState(movieId.toString());

    if (sessionState) {
      setMovie(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    if (movieId)
      sessionStorage.setItem(movieId.toString(), JSON.stringify(movie));
  }, [movieId, movie]);

  return { movie, loading, error };
};
