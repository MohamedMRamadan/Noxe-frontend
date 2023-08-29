import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getMediaData } from "../components/utils/Media";
import MediaItem from "../components/MediaItem";
import Loading from "../components/Loading";

const Movies = () => {
  const { movies } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={movies}>
        {(movies) => (
          <div className="container mt-5">
            <div className="row">
              {movies.map((movie) => (
                <MediaItem key={movie.id} itemData={movie} />
              ))}
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
export default Movies;

export const loader = async () => {
  return defer({
    movies: getMediaData("movie"),
  });
};
