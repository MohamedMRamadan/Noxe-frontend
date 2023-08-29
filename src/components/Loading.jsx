import React from "react";

const Loading = () => {
  return (
    <>
      <div
        id="loading"
        className="vh-100 w-100 position-absolute top-0  d-flex align-items-center justify-content-center z-0"
      >
        <p>
          <i className="fs-1 fa-solid fa-spinner fa-spin"></i>
        </p>
      </div>
    </>
  );
};

export default Loading;
