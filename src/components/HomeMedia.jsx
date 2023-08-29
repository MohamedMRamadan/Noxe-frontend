import React from "react";
import classes from "./HomeMedia.module.css";
import MediaItem from "./MediaItem";

const HomeMedia = ({ mediaType, mediaData }) => {
  return (
    <>
      <div className="container mt-4 pb-5">
        <div className="row gy-4">
          <div className={`${classes.title} col-md-4`}>
            <h2>
              Trending <br /> {mediaType} <br /> to watch now
            </h2>
            <p className="mt-3 text-muted">Most Watched {mediaType} By Weeks</p>
          </div>
          {mediaData?.slice(10).map((item) => (
            <MediaItem key={item.id} itemData={item} />
          ))}
        </div>
      </div>
    </>
  );
};
export default HomeMedia;
