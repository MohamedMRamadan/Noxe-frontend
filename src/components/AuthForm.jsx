import React from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import classes from "./AuthForm.module.css";
import { errorHandling, errorRefactor } from "./utils/auth";
import PageContent from "./PageContent";

const AuthForm = () => {
  const [queryParams] = useSearchParams();
  const mode = queryParams.get("mode") || "login";
  const atSignup = mode === "signup";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  const navigate = useNavigate();

  let errors;
  let message = "";

  if (data?.details) {
    errors = errorHandling(data.details);
  }
  // console.log({ validationErrors: errors });

  if (data?.message) {
    message = data.message;
    Array.from(document.querySelectorAll("input")).map(
      (ele) => (ele.value = "")
    );
    if (!data.status) {
      if (data.token) {
        setTimeout(() => {
          return navigate("/");
        }, 3000);
      } else if (mode !== "forgotPassword") {
        setTimeout(() => {
          return navigate("/auth?mode=login");
        }, 3000);
      } else if (data.url) {
        setTimeout(() => {
          return navigate(data.url);
        }, 3000);
      }
    }
  }

  return (
    <PageContent
      className={`${classes.authForm} authForm container-md m-auto  mt-5`}
    >
      <div className="w-75 px-xl-5 m-auto">
        <h1 className="text-center mb-4 position-relative">
          {mode === "forgotPassword" && (
            <Link to="?mode=login" className="">
              <i className="fa-solid fa-arrow-left float-start position-absolute top-0 start-0 mt-1"></i>
            </Link>
          )}
          <span>
            {mode === "login" && "Login"}
            {atSignup && "Signup"}
            {mode === "forgotPassword" && "Find your account"}
          </span>
        </h1>
        <Form method="post" className="row align-items-start">
          {atSignup && (
            <>
              <div className="my-3 col-md-6">
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First name"
                  required
                />
                {errorRefactor(errors, "firstName")}
              </div>
              <div className="my-3 col-md-6">
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  required
                />
                {errorRefactor(errors, "lastName")}
              </div>
              <div className="my-3 col-md-6">
                <input
                  className="form-control"
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Age"
                  required
                />
                {errorRefactor(errors, "age")}
              </div>
              <div className="my-3 col-md-6">
                <select
                  defaultValue=""
                  className="form-control"
                  name="gender"
                  id="gender"
                  required
                >
                  <option disabled value="">
                    -- Gender --
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </>
          )}
          <div className="my-3 col-md-12">
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder={`${
                mode === "forgotPassword"
                  ? "Enter your email to reset your password"
                  : "Email"
              }`}
              required
            />
            {errorRefactor(errors, "email")}
          </div>
          {mode !== "forgotPassword" && (
            <div className="col-md-12 my-3">
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
              {errorRefactor(errors, "password")}
            </div>
          )}
          <div className="row m-0 gy-4">
            {mode !== "forgotPassword" && (
              <div className="d-flex flex-wrap justify-content-between gap-3 align-items-center col-md-7">
                {mode !== "forgotPassword" && (
                  <Link
                    className={`${classes.authNav} `}
                    to={`?mode=${atSignup ? "login" : "signup"}`}
                  >
                    {atSignup ? "Do you have an account" : "Signup"}{" "}
                    <span className="text-primary fw-bold">?</span>
                  </Link>
                )}
                {mode === "login" && (
                  <Link
                    className={`${classes.authNav} `}
                    to={`?mode=forgotPassword`}
                  >
                    Forgot password{" "}
                    <span className="text-primary fw-bold">?</span>
                  </Link>
                )}
              </div>
            )}
            <button
              className={`btn btn-primary py-2 px-5 ${
                mode === "forgotPassword"
                  ? "flex-grow-1"
                  : "col-md-4 offset-md-1"
              }`}
            >
              {isSubmitting ? "Loading..." : "Send"}
            </button>
          </div>
        </Form>
        {message && (
          <p
            className={`${
              !data.status ? "text-success" : "text-danger"
            } mt-3 py-2 px-4 bg-white rounded-3 fw-bold text-center`}
          >
            {message}
          </p>
        )}
      </div>
    </PageContent>
  );
};
export default AuthForm;
