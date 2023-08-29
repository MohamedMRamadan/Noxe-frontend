import React from "react";
import PageContent from "../components/PageContent";
import axios from "axios";
import { Form, useActionData, useNavigate } from "react-router-dom";

const ConfirmCode = () => {
  const dataObj = useActionData();
  const { data } = dataObj || { data: "" };
  const navigate = useNavigate();

  if (data && !data?.status) {
    const url = dataObj.url;
    setTimeout(() => {
      return navigate(url);
    }, 2000);
    console.log(url);
  }
  const inputHandler = (e) => {
    const value = e.target.value;
    const inputId = e.target.id;
    const inputNumber = inputId[inputId.length - 1];

    console.log(inputNumber);

    if (value.length >= 1) {
      e.target.value = value.slice(0, 1);
      const nextInputId = `input${+inputNumber + 1}`;
      console.log(nextInputId);
      if (+inputNumber + 1 !== 7) document.getElementById(nextInputId).focus();
      else document.querySelector("button").focus();
    }
  };

  return (
    <PageContent title={"Confirm Code"} className=" container mt-5">
      <Form method="post" className="w-50 m-auto">
        <div className="d-flex justify-content-center gap-2 m-auto">
          <input
            className="form-control text-center"
            id="input1"
            name="input1"
            onInput={inputHandler}
            type="number"
          />
          <input
            className="form-control text-center"
            id="input2"
            name="input2"
            onInput={inputHandler}
            type="number"
          />
          <input
            className="form-control text-center"
            id="input3"
            name="input3"
            onInput={inputHandler}
            type="number"
          />
          <input
            className="form-control text-center"
            id="input4"
            name="input4"
            onInput={inputHandler}
            type="number"
          />
          <input
            className="form-control text-center"
            id="input5"
            name="input5"
            onInput={inputHandler}
            type="number"
          />
          <input
            className="form-control text-center"
            id="input6"
            name="input6"
            onInput={inputHandler}
            type="number"
          />
        </div>
        <button className="btn btn-primary my-3 w-100 mt-4">Send</button>
      </Form>
      {data?.message && (
        <p
          style={{ width: "50%" }}
          className={`${
            !data?.status ? "text-success" : "text-danger"
          } mt-4 px-4 py-2 rounded-3 bg-white m-auto fw-bold`}
        >
          {data?.message}
        </p>
      )}
    </PageContent>
  );
};
export default ConfirmCode;

export const action = async ({ request, params }) => {
  const queryParams = new URL(request.url).searchParams;
  const _id = queryParams.get("u");
  const statue = queryParams.get("fi");
  const token = queryParams.get("tk");

  const formData = await request.formData();

  let code = "";
  for (let i = 1; i < 7; i++) {
    code += formData.get(`input${i}`);
  }
  const checkCodeObj = {
    code,
    _id,
    statue,
    token,
  };
  try {
    const apiResponse = await axios.post(
      `https://noxe-backend.onrender.com/auth/checkCode`,
      checkCodeObj
    );
    console.log(apiResponse);

    const url = `/password/update/?u=${_id}&cd=${code}&fi=default_update&tk=${token}`;
    const { data } = apiResponse;

    return { data, url };
  } catch ({ response }) {
    console.log(response);
    return { data: response.data };
  }
};
