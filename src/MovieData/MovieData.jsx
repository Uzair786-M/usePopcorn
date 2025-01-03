import { useState } from "react";
import ListMovie from "./ListMovie";
import Box from "../Box";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const MovieData = ({ movies, isLoading, isError, setIsSelectedId }) => {
  return (
    <>
      <Box>
        {/* {isLoading ? (
          <Loader />
        ) : (
          <ul className="list">
            {movies?.map((movie) => (
              <ListMovie movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        )} */}
        {isLoading && !isError && <Loader />}
        {!isLoading && !isError && (
          <ul className="list list-movies">
            {movies?.map((movie) => (
              <ListMovie
                movie={movie}
                key={movie.imdbID}
                setIsSelectedId={setIsSelectedId}
              />
            ))}
          </ul>
        )}
        {!isLoading && isError && <Error isError={isError} />}
      </Box>
    </>
  );
};
export default MovieData;
