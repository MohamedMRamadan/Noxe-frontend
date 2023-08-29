import React from "react";
import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

const Error = () => {
  console.log("error");
  const error = useRouteError();
  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error?.data?.message) {
    message = error.data.message;
  }
  if (error?.message) {
    message = error.message;
  }

  return (
    <PageContent
      title={title}
      className="vh-100 w-100 d-flex flex-wrap justify-content-center align-items-center align-content-center"
    >
      <p>{message}</p>
    </PageContent>
  );
};
export default Error;
