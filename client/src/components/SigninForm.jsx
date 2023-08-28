import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, TextField, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import userApi from '../apis/modules/user.api';
import { setUser } from '../redux/features/userSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { toast } from 'react-toastify';
import yupConfigs from '../configs/yup.configs';

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver(yupConfigs.schemaSignin)
  });


  const handleSubmit = async (data) => {
    setErrorMessage(undefined);
    setIsLoginRequest(true);
    const { response, err } = await userApi.signin(data);
    setIsLoginRequest(false);
    if (response) {
      signinForm.reset();
      dispatch(setUser(response));
      dispatch(setAuthModalOpen(false));
      toast.success('Sign in success');
    }
    if (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Box component='form' onSubmit={signinForm.handleSubmit(handleSubmit)}>
      <Stack spacing={3}>
        <TextField
          {
            ...signinForm.register('username')
          }
          type='text'
          placeholder='username'
          name='username'
          fullWidth
          color='success'
          error={signinForm?.formState?.touchedFields && signinForm?.formState?.errors?.username?.message !== undefined}
          helperText={signinForm?.formState?.touchedFields && signinForm?.formState?.errors?.username?.message}
        />
        <TextField
          {
            ...signinForm.register('password')
          }
          type='password'
          placeholder='password'
          name='password'
          fullWidth
          color='success'
          error={signinForm?.formState?.touchedFields && signinForm?.formState?.errors?.password?.message !== undefined}
          helperText={signinForm?.formState?.touchedFields && signinForm?.formState?.errors?.password?.message}
        />

      </Stack>
      <LoadingButton
        type='submit'
        fullWidth
        size='large'
        variant='contained'
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign in
      </LoadingButton>

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        sign up
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity='error' variant='outlined' >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default SigninForm;