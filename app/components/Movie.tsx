import { Thumbnail } from "./Thumbnail";

interface IMovieProps {
  thumbnailSrc: string;
  title: string;
  averageRating: number;
  onClick: () => void;
}

export const Movie = (props: IMovieProps) => {
  return (
    <div className="movie-card">
      <Thumbnail src={props.thumbnailSrc} alt={props.title} />
      <h3>{props.title}</h3>
      <p>Average Rating: {props.averageRating}</p>
      <button onClick={props.onClick}>View Details</button>
    </div>
  );
};
