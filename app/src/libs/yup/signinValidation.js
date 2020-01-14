import * as Yup from 'yup';

const signinValidation = Yup.object().shape({
  email: Yup.string()
    .email()
    .trim()
    .lowercase()
    .required('Email Is Required'),
  password: Yup.string().required('Password is Required')
});

export default signinValidation;
