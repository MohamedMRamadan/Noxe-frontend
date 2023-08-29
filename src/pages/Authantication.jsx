import React from "react";
import AuthForm from "../components/AuthForm";
import { json } from "react-router-dom";
import axios from "axios";
import { authSchema, setAuth } from "../components/utils/auth";

const Authantication = () => {
  return <AuthForm />;
};
export default Authantication;

export const action = async ({ request, params }) => {
  const queryParams = new URL(request.url).searchParams;
  const mode = queryParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup" && mode !== "forgotPassword") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }
  const formData = await request.formData();
  const dataObj = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    age: formData.get("age"),
    gender: formData.get("gender"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  let validation = authSchema(mode, dataObj);

  if (validation?.error?.details) {
    return { status: 422, details: validation.error.details };
  }
  try {
    const apiResponse = await axios.post(
      `https://noxe-backend.onrender.com/auth/${mode}`,
      dataObj
    );
    const { data } = apiResponse;
    if (data.token) setAuth(data);
    return data;
  } catch ({ response }) {
    return response.data;
  }
};
