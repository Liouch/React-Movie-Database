import React from "react";
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
import { useHomeFetch } from "../hooks/useHomeFetch";

import NoImage from "../images/no_image.jpg";
import Grid from "./Grid/Grid";
import HeroImage from "./HeroImage/HeroImage";
import SearchBar from "./SearchBar/SearchBar";
import { Spinner } from "./Spinner/Spinner.styles";
import Thumbnail from "./Thumbnails/Thumbnail";

const Home = () => {
  const { movies, loading, error, movieSearch, setMovieSearch } =
    useHomeFetch();
  console.log(movies);

  return (
    <>
      {!movieSearch && movies.results[0] && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
          title={movies.results[0].original_title}
          text={movies.results[0].overview}
        />
      )}
      <SearchBar setMovieSearch={setMovieSearch} />
      <Grid header={movieSearch ? "Search result" : "Popular movies"}>
        {movies.results.map((movie) => (
          <Thumbnail
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      <Spinner />
    </>
  );
};

export default Home;
