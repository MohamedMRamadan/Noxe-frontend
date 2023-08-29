import React from "react";
import PageContent from "../components/PageContent";
import axios from "axios";
import { Form, useActionData, useNavigate } from "react-router-dom";
import {
  errorHandling,
  errorRefactor,
  updatePasswordSchema,
} from "../components/utils/auth";

const UpdatePassword = () => {
  const data = useActionData();
  const navigate = useNavigate();

  let errors;

  if (data && !data.status) {
    setTimeout(() => {
      return navigate("/auth");
    }, 3000);
  }

  if (data?.details) {
    errors = errorHandling(data.details);
  }
  return (
    <PageContent
      title={"Update Password"}
      className="container row m-auto mt-5"
    >
      <div className="m-auto col-md-6">
        <Form method="post">
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Enter your new password"
          />
          <button className="btn btn-primary my-3 w-100 mt-4">Send</button>
        </Form>
        {errorRefactor(errors, "password")}
        {data?.message && (
          <p
            className={`${
              !data.status ? "text-success" : "text-danger"
            } mt-3 py-2 px-4 bg-white rounded-3 fw-bold text-center`}
          >
            {data.message}
          </p>
        )}
      </div>
    </PageContent>
  );
};
export default UpdatePassword;

export const action = async ({ request, params }) => {
  console.log("hello");
  const queryParams = new URL(request.url).searchParams;
  const _id = queryParams.get("u");
  const statue = queryParams.get("fi");
  const token = queryParams.get("tk");
  const code = queryParams.get("cd");

  const formData = await request.formData();

  const password = formData.get("password");
  console.log(password);

  const body = {
    code,
    _id,
    statue,
    token,
    password,
  };
  const validation = updatePasswordSchema({ password });
  console.log(validation);
  if (validation?.error?.details) {
    return { status: 422, details: validation.error.details };
  }
  try {
    const apiResponse = await axios.put(
      `https://noxe-backend.onrender.com/auth/updatePassword`,
      body
    );
    console.log(apiResponse);

    const { data } = apiResponse;

    return data;
  } catch ({ response }) {
    console.log(response);
    return response.data;
  }
};
