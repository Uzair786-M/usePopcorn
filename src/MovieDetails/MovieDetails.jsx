import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import StarRating from "../StarRating/StarRating";
const apikey = "c6b69932";
const MovieDetails = ({ isSelectedId, onCloseMovie, setWatched, watched }) => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const movieDetails = async () => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&i=${isSelectedId}`,
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
    Year: year,

    imdbID,
  } = selectedMovie;

  const watchedMovie = {
    imdbID,

    title,
    poster,
    imdbRating,
    runTime: runTime?.split(" ").at(0),
    year,
    userRating: userRating,
  };

  function onAddHandler() {
    setWatched((watched) => [...watched, watchedMovie]);
    onCloseMovie();
  }

  // Effect for changing document title with selected movie
  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    // Cleanup function

    return () => (document.title = "usePopcorn");
  }, [title]);

  // const userRatingWatched = watched
  //   .map((movie) => console.log("movie", movie))
  //   .filter((movie) => movie?.imdbID !== isSelectedId);
  // console.log("user", userRatingWatched);
  // console.log("watched", watched);
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
              <StarRating
                maxRating={10}
                size={24}
                color="yellow"
                onSetRating={setUserRating}
              />
              {watched.map((movie) => movie.imdbID)?.includes(isSelectedId) ? (
                <div>
                  You rated {watchedMovie.userRating} stars to this movie
                </div>
              ) : (
                <button className="btn-add" onClick={onAddHandler}>
                  + Add to list
                </button>
              )}
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
