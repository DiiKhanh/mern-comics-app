import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ContainerBox from '../components/ContainerBox';
import uiConfigs from '../configs/ui.configs';
import { useState } from 'react';
import userApi from '../apis/modules/user.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import Helmet from '../components/Helmet';
import LockResetIcon from '@mui/icons-material/LockReset';
import yupConfigs from '../configs/yup.configs';

const PasswordUpdate = () => {
  const [onRequest, setOnRequest] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updatePasswordForm = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    resolver: yupResolver(yupConfigs.schemaPassword)
  });

  const handleSubmit = async (values) => onUpdate(values);

  const onUpdate = async (values) => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await userApi.passwordUpdate(values);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      updatePasswordForm.reset();
      navigate('/');
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success('Update password success! Please re-login');
    }
  };

  return (
    <Helmet title={'Update password'}>
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <ContainerBox header='update password' icon={<LockResetIcon />}>
          <Box component='form' maxWidth='400px' onSubmit={updatePasswordForm.handleSubmit(handleSubmit)}>
            <Stack spacing={2}>
              <TextField
                {
                  ...updatePasswordForm.register('password')
                }
                type='password'
                placeholder='password'
                name='password'
                fullWidth
                color='success'
                error={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.password?.message !== undefined}
                helperText={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.password?.message}
                sug
              />
              <TextField
                {
                  ...updatePasswordForm.register('newPassword')
                }
                type='password'
                placeholder='new password'
                name='newPassword'
                fullWidth
                color='success'
                error={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.newPassword?.message !== undefined}
                helperText={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.newPassword?.message}
              />
              <TextField
                {
                  ...updatePasswordForm.register('confirmNewPassword')
                }
                type='password'
                placeholder='confirm new password'
                name='confirmNewPassword'
                fullWidth
                color='success'
                error={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.confirmNewPassword?.message !== undefined}
                helperText={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.confirmNewPassword?.message}
              />

              <LoadingButton
                type='submit'
                variant='contained'
                fullWidth
                sx={{ marginTop: 4 }}
                loading={onRequest}
              >
              update password
              </LoadingButton>
            </Stack>
          </Box>
        </ContainerBox>
      </Box>
    </Helmet>
  );
};

export default PasswordUpdate;