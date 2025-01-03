const ListMovie = ({ movie, setIsSelectedId }) => {
  const selectedMoviesHandler = (id) => {
    return setIsSelectedId(id);
  };
  return (
    <>
      <li onClick={() => selectedMoviesHandler(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
};

export default ListMovie;
