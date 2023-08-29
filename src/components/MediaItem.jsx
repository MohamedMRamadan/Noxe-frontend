import React from "react";
import classes from "./MediaItem.module.css";
import { Link } from "react-router-dom";

const MediaItem = ({ itemData }) => {
  return (
    <div className="col-md-2">
      <div className="inner">
        <Link
          className="text-white"
          to={`/details/${itemData.media_type}/${itemData.id}`}
        >
          <div className={classes.itemImage}>
            <div className={classes.overlay}>
              <p>{itemData.overview?.split(" ").slice(0, 10).join(" ")}</p>
              {!itemData.overview && (
                <div>
                  <h5 className="text-info">Know for</h5>
                  <p>{itemData.known_for[0].title}</p>
                </div>
              )}
            </div>

            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/w500${
                itemData?.poster_path || itemData.profile_path
              }`}
              alt=""
            />
          </div>
        </Link>
        <h6 className="mt-3">{itemData.title || itemData.name}</h6>
      </div>
    </div>
  );
};
export default MediaItem;
