import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getMediaData } from "../components/utils/Media";
import MediaItem from "../components/MediaItem";
import Loading from "../components/Loading";

const TvShows = () => {
  const { tv } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={tv}>
        {(tv) => (
          <div className="container mt-5">
            <div className="row">
              {tv.map((show) => (
                <MediaItem key={show.id} itemData={show} />
              ))}
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
export default TvShows;

export const loader = async () => {
  return defer({
    tv: getMediaData("tv"),
  });
};
