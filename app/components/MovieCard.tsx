import Thumbnail from "./MovieImage";

interface IMovieProps {
  thumbnailSrc: string;
  thumbnailClassName: string;
  title: string;
  averageRating: string;
  onClick: () => void;
}

const MovieCard = (props: IMovieProps) => {
  return (
    <div className="">
      <Thumbnail
        src={props.thumbnailSrc}
        alt={props.title}
        className={props.thumbnailClassName}
      />
      <h3>{props.title}</h3>
      <p>Average Rating: {props.averageRating}</p>
      <button onClick={props.onClick}>View Details</button>
    </div>
  );
};

export default MovieCard;
