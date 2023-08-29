import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getMediaDetailsData } from "../components/utils/Media";
import Loading from "../components/Loading";

const MediaDetails = () => {
  const { data } = useLoaderData();
  console.log(data);

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        {(data) => (
          <div className="container my-5">
            <div className="row gx-5">
              <div className="Holder col-md-5">
                <div className="position-relative">
                  <span className="fw-bold p-2 rounded-0 bg-success position-absolute end-0">
                    {data.status}
                  </span>
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500${
                      data?.poster_path || data.profile_path
                    }`}
                    alt=""
                  />
                  <p className={`toggle py-3 m-0 fw-semibold text-center `}>
                    {data.tagline}..
                  </p>
                </div>
              </div>
              <div className="col-md-7">
                <h2>{data.title || data.original_name}</h2>
                <p className="my-3">
                  Geners :
                  {data.genres.map((genre) => (
                    <span className="badge bg-info mx-1" key={genre.id}>
                      {genre.name}
                    </span>
                  ))}
                </p>
                <p>Vote avg: {data.vote_average}</p>
                <p>Vote count: {data.vote_count}</p>
                <p>Popularity: {data.popularity}</p>
                <p>Released date: {data.release_date}</p>
                <p>
                  Languages:{" "}
                  {data.spoken_languages.map((genre) => (
                    <span className="badge bg-info mx-1" key={genre.name}>
                      {genre.english_name}
                    </span>
                  ))}
                </p>
                <p>
                  Production Countries :
                  {data.production_countries.map((prd) => (
                    <span className="badge bg-info mx-1" key={prd.iso_3166_1}>
                      {prd.name}
                    </span>
                  ))}
                </p>

                <div className="mt-5">
                  <h4 className="text-info">Story:</h4>
                  <p className="lh-lg">{data.overview}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-info mt-5 mb-4">Sponsored By :</h3>
              <div className="row gy-5">
                {data.production_companies.map((comp) => (
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <div className="img">
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/w500/${comp.logo_path}`}
                        alt=""
                      />
                    </div>
                    {!comp.logo_path && (
                      <p className="fs-3 text-center text-secondary fw-bold">
                        {comp.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
export default MediaDetails;

export const loader = async ({ requser, params }) => {
  const { mediaType, id } = params;
  return defer({
    data: getMediaDetailsData(mediaType, id),
  });
};
