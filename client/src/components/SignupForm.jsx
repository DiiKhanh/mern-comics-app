import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import yupConfigs from '../configs/yup.configs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, TextField, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import userApi from '../apis/modules/user.api';
import { setUser } from '../redux/features/userSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { toast } from 'react-toastify';

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName:'',
      email: ''
    },
    resolver: yupResolver(yupConfigs.schemaSignup)
  });
  const handleSubmit = async (data) => {
    setErrorMessage(undefined);
    setIsLoginRequest(true);
    const { response, err } = await userApi.signup(data);
    setIsLoginRequest(false);
    if (response) {
      signupForm.reset();
      dispatch(setUser(response));
      dispatch(setAuthModalOpen(false));
      toast.success('Sign up success');
    }
    if (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Box component='form' onSubmit={signupForm.handleSubmit(handleSubmit)}>
      <Stack spacing={3}>
        <TextField
          {
            ...signupForm.register('username')
          }
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          color="success"
          error={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.username?.message !== undefined}
          helperText={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.username?.message}
        />
        <TextField
          {
            ...signupForm.register('email')
          }
          type="email"
          placeholder="email"
          name="email"
          fullWidth
          color="success"
          error={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.email?.message !== undefined}
          helperText={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.email?.message}
        />
        <TextField
          {
            ...signupForm.register('password')
          }
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          color="success"
          error={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.password?.message !== undefined}
          helperText={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.password?.message}
        />
        <TextField
          {
            ...signupForm.register('confirmPassword')
          }
          type="password"
          placeholder="confirmPassword"
          name="confirmPassword"
          fullWidth
          color="success"
          error={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.confirmPassword?.message !== undefined}
          helperText={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.confirmPassword?.message}
        />
        <TextField
          {
            ...signupForm.register('displayName')
          }
          type="text"
          placeholder="displayName"
          name="displayName"
          fullWidth
          color="success"
          error={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.displayName?.message !== undefined}
          helperText={signupForm?.formState?.touchedFields && signupForm?.formState?.errors?.displayName?.message}
        />

      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign up
      </LoadingButton>

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;