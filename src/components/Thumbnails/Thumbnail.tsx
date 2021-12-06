import React from "react";
import { Image } from "./Thumbnails.styles";

type Props = {
  image: string;
  movieId: string;
  clickable: boolean;
};

const Thumbnail = ({ image, movieId, clickable }: Props) => (
  <div>
    <Image src={image} alt="movie-thumbnail" />
  </div>
);

export default Thumbnail;
