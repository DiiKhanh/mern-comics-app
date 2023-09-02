import * as Yup from 'yup';

const schemaSignin = Yup.object({
  username: Yup.string()
    .min(6, 'username minimum 6 characters')
    .required('username is required'),
  password: Yup.string()
    .min(6, 'password minimum 6 characters')
    .required('password is required')
});

const schemaSignup = Yup.object({
  username: Yup.string()
    .min(6, 'username minimum 6 characters')
    .required('username is required'),
  password: Yup.string()
    .min(6, 'password minimum 6 characters')
    .required('password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'confirmPassword not match')
    .min(6, 'confirmPassword minimum 6 characters')
    .required('confirmPassword is required'),
  displayName: Yup.string()
    .min(6, 'displayName minimum 6 characters')
    .required('passwdisplayNameord is required'),
  email: Yup.string().email().required('email is required')
});

const schemaPassword = Yup.object({
  password: Yup.string()
    .min(6, 'password minimum 6 characters')
    .required('password is required'),
  newPassword: Yup.string()
    .min(6, 'newPassword minimum 6 characters')
    .required('newPassword is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'confirmNewPassword not match')
    .min(6, 'confirmNewPassword minimum 6 characters')
    .required('confirmNewPassword is required')
});

export default { schemaSignin, schemaSignup, schemaPassword };