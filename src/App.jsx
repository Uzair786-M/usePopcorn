import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import WatchedData from "./WatchedData/WatchedData";
import MovieData from "./MovieData/MovieData";
import SearchMovies from "./Navbar/SearchMovies";
import NumResults from "./Navbar/NumResults";

const apikey = "c6b69932";

export default function App() {
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isSelectedId, setIsSelectedId] = useState(null);
  console.log(isSelectedId);

  useEffect(() => {
    const searchMovies = async () => {
      setIsLoading(true);
      setIsError("");
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apikey}&s=${query}`
        );

        const data = await response.json();
        setMovies(data.Search);

        if (!response.ok) {
          console.log("Response is not OK:", response.status);
          throw new Error("Movie not Found");
        } else if (response.ok && query === "") {
          console.log("Response is OK:", response.status);
          throw new Error("Search for Movies");
        }
      } catch (error) {
        console.error(`Fetch Failed:${error.message}`);
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  const onCloseMovie = () => {
    setIsSelectedId(null);
  };

  return (
    <>
      <Navbar>
        <SearchMovies movies={movies} query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <main className="main">
        <MovieData
          movies={movies}
          isLoading={isLoading}
          isError={isError}
          setIsSelectedId={setIsSelectedId}
        />
        <WatchedData isSelectedId={isSelectedId} onCloseMovie={onCloseMovie} />
      </main>
    </>
  );
}
