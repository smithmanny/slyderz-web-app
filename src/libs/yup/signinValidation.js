import * as Yup from "yup";

const signinValidation = Yup.object().shape({
  email: Yup.string().email().trim().lowercase().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default signinValidation;
