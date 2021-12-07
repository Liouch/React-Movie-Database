import React from "react";
import { Image } from "./Thumbnails.styles";
import { Link } from "react-router-dom";

type Props = {
  image: string;
  movieId: string;
  clickable: boolean;
};

const Thumbnail = ({ image, movieId, clickable }: Props) => (
  <div>
    {clickable ? (
      <Link to={`/${movieId}`}>
        <Image src={image} alt="movie-thumbnail" />
      </Link>
    ) : (
      <Image src={image} alt="movie-thumbnail" />
    )}
  </div>
);

export default Thumbnail;
