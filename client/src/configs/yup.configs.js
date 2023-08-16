import * as Yup from 'yup';

const schemaSignin = Yup.object({
  username: Yup.string()
    .min(8, 'username minimum 6 characters')
    .required('username is required'),
  password: Yup.string()
    .min(8, 'password minimum 6 characters')
    .required('password is required')
});

const schemaSignup = Yup.object({
  username: Yup.string()
    .min(8, 'username minimum 6 characters')
    .required('username is required'),
  password: Yup.string()
    .min(8, 'password minimum 6 characters')
    .required('password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'confirmPassword not match')
    .min(8, 'confirmPassword minimum 6 characters')
    .required('confirmPassword is required'),
  displayName: Yup.string()
    .min(8, 'displayName minimum 6 characters')
    .required('passwdisplayNameord is required'),
  email: Yup.string().email().required('email is required')
});

export default { schemaSignin, schemaSignup };