import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import StarRating from "../StarRating/StarRating";
const apikey = "c6b69932";
const MovieDetails = ({ isSelectedId, onCloseMovie }) => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const movieDetails = async () => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&i=${isSelectedId}`
      );

      const data = await res.json();
      //   console.log("data", data);
      setSelectedMovie(data);
      setIsLoading(false);
    };
    movieDetails();
  }, [isSelectedId]);
  console.log(selectedMovie);
  const {
    Title: title,
    Poster: poster,
    Released: released,
    Runtime: runTime,
    Genre: genre,
    Plot: plot,
    imdbRating,
    Actors: actors,
    Director: director,
  } = selectedMovie;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${selectedMovie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runTime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} color="yellow" />
              <button className="btn-add">+ Add to list</button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
