import React from "react";
import PageContent from "../components/PageContent";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
const VerifyPage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  if (data?.message) {
    setTimeout(() => {
      return navigate("/auth");
    }, 4000);
  }

  return (
    <PageContent
      title={"Verification message"}
      titleClass={"mt-4 mx-0"}
      className="container mt-5"
    >
      <p
        className={`${
          !data.status ? "text-success" : "text-danger"
        } col-lg-6 m-auto mt-4 px-4 py-2 rounded-3 bg-white fw-bold`}
      >
        {data?.message}
      </p>
    </PageContent>
  );
};
export default VerifyPage;

export const loader = async ({ request, params }) => {
  const queryParams = new URL(request.url).searchParams;
  const _id = queryParams.get("u");
  const statue = queryParams.get("fi");
  const token = queryParams.get("tk");
  const verifyObj = {
    _id,
    statue,
    token,
  };
  try {
    const apiResponse = await axios.post(
      `https://noxe-backend.onrender.com/auth/verify`,
      verifyObj
    );
    console.log(apiResponse);
    const { data } = apiResponse;
    return data;
  } catch ({ response }) {
    console.log(response);
    return response.data;
  }
};
