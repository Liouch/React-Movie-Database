import { Wrapper, Content, Text } from "./MovieInfo.styles";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import Thumbnail from "../Thumbnails/Thumbnail";
import NoImage from "../../images/no_image.jpg";
import { Movie } from "../../hooks/useMovieFetch";

type Props = {
  movie: Movie;
};

const MovieInfo = ({ movie }: Props) => {
  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumbnail
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false}
          movieId={movie.id}
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>Plot</h3>
          <p>{movie.overview}</p>
          <div className="rating-directors">
            <div>
              <h3>RATING</h3>
              <div className="score">{movie.vote_average}</div>
            </div>
            <div className="director">
              <h3>
                {Array.isArray(movie.directors) && movie.directors.length > 1
                  ? "DIRECTORS"
                  : "DIRECTOR"}
              </h3>
              {Array.isArray(movie.directors) &&
                movie.directors.map((director) => {
                  return <p key={director.credit_id}>{director.name}</p>;
                })}
            </div>
          </div>
        </Text>
      </Content>
    </Wrapper>
  );
};
export default MovieInfo;
