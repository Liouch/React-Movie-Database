import React from "react";

import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import Grid from "./Grid/Grid";
import Spinner from "./Spinner/Spinner";
import { useMovieFetch } from "../hooks/useMovieFetch";
import NoImage from "../images/no_image.jpg";
import { useParams } from "react-router-dom";
const Movie = () => {
  const { movieId } = useParams();
  const { movie, loading, error } = useMovieFetch(movieId);

  
  return (
    <>
      <div>Movie</div>
    </>
  );
};

export default Movie;
