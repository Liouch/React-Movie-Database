import React from "react";

import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import Grid from "./Grid/Grid";
import Spinner from "./Spinner/Spinner";
import { useMovieFetch } from "../hooks/useMovieFetch";
import NoImage from "../images/no_image.jpg";
import { useParams } from "react-router-dom";
import BreadCrumb from "./BreadCrumb/BreadCrumb";

const Movie = () => {
  const { movieId } = useParams();
  const { movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  return <>{movie && <BreadCrumb movieTitle={movie.original_title} />}</>;
};

export default Movie;
