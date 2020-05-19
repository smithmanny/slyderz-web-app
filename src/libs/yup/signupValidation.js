import * as Yup from 'yup';

const signupValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .required('First Name Is Required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .required('Last Name Is Required'),
  email: Yup.string()
    .email()
    .trim()
    .lowercase()
    .required('Email Is Required'),
  password: Yup.string().required('Password is Required')
});

export default signupValidation;
