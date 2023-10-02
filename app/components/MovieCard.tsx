import Thumbnail from "./Thumbnail";

interface IMovieProps {
  thumbnailSrc: string;
  title: string;
  averageRating: string;
  onClick: () => void;
}

const MovieCard = (props: IMovieProps) => {
  return (
    <div className="">
      <Thumbnail src={props.thumbnailSrc} alt={props.title} />
      <h3>{props.title}</h3>
      <p>Average Rating: {props.averageRating}</p>
      <button onClick={props.onClick}>View Details</button>
    </div>
  );
};

export default MovieCard;
