import Thumbnail from "./MovieImage";

interface IMovieProps {
  id: string;
  thumbnailSrc: string;
  thumbnailClassName: string;
  title: string;
  averageRating: string;
  onClick: (id: string) => void;
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
      <button onClick={() => props.onClick(props.id)}>View Details</button>
    </div>
  );
};

export default MovieCard;
