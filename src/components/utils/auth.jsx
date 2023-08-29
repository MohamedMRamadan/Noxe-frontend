import Joi from "joi";
const signupSchema = (user) => {
  let schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(18)
      .required(),
    age: Joi.number().min(18).max(100).required(),
    gender: Joi.string().min(4).max(6).required(),
    password: Joi.string().pattern(
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/
    ),
  });
  return schema.validate(user, { abortEarly: false });
};
const signinSchema = (user) => {
  let schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(18)
      .required(),
    password: Joi.string()
      .pattern(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/)
      .required(),
  });
  return schema.validate(user, { abortEarly: false });
};
const forgotPasswordSchema = (user) => {
  let schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(18)
      .required(),
  });
  return schema.validate(user, { abortEarly: false });
};
export const updatePasswordSchema = (user) => {
  let schema = Joi.object({
    password: Joi.string()
      .pattern(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/)
      .required(),
  });
  return schema.validate(user, { abortEarly: false });
};
export const errorHandling = (details) => {
  const errors = {
    firstName: { message: "" },
    lastName: { message: "" },
    age: { message: "" },
    gender: { message: "" },
    email: { message: "" },
    password: { message: "" },
  };
  details.map((err) => {
    if (err.path[0] === "password") {
      errors[err.path[0]] = {
        message: `"password" doesn't match the required pattern At least one upper case, one lower case,one digit, one special character and Minimum eight in length`,
      };
    } else {
      console.log(errors[err.path[0]]);
      errors[err.path[0]].message = err.message;
    }
    return err;
  });

  return errors;
};
export const errorRefactor = (errors, inputName) => {
  return (
    errors?.[inputName]?.message && (
      <p className="mb-0 mt-3 bg-white text-danger text-center px-4 py-2 rounded-4 fw-bold">
        {errors?.[inputName]?.message}
      </p>
    )
  );
};
export const authSchema = (mode, dataObj) => {
  if (mode === "login") {
    return signinSchema({ email: dataObj.email, password: dataObj.password });
  } else if (mode === "signup") {
    return signupSchema(dataObj);
  } else {
    return forgotPasswordSchema({ email: dataObj.email });
  }
};
export const setAuth = (data) => {
  localStorage.setItem("tk", data.token);
};
