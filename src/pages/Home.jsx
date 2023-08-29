import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getMediaData } from "../components/utils/Media";
import HomeMedia from "../components/HomeMedia";
import Loading from "../components/Loading";
const Home = () => {
  const { movies, series, people } = useLoaderData();
  return (
    <div className="my-5">
      <Suspense fallback={<Loading />}>
        <Await resolve={movies}>
          {(movies) => <HomeMedia mediaType={"Movies"} mediaData={movies} />}
        </Await>
        <Await resolve={series}>
          {(series) => <HomeMedia mediaType={"Tv"} mediaData={series} />}
        </Await>
        <Await resolve={people}>
          {(people) => <HomeMedia mediaType={"people"} mediaData={people} />}
        </Await>
      </Suspense>
    </div>
  );
};
export default Home;

export const loader = async () => {
  return defer({
    movies: getMediaData("movie"),
    series: getMediaData("tv"),
    people: getMediaData("person"),
  });
};
