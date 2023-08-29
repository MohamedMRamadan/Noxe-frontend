import React from "react";
import { defer, useLoaderData } from "react-router-dom";
import { getMediaData } from "../components/utils/Media";
import MediaItem from "../components/MediaItem";

const People = () => {
  const { people } = useLoaderData();
  return (
    <div className="container mt-5">
      <div className="row gy-4">
        {people.map((person) => (
          <MediaItem key={person.id} itemData={person} />
        ))}
      </div>
    </div>
  );
};
export default People;

export const loader = async () => {
  return defer({
    people: await getMediaData("person"),
  });
};
