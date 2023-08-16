import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Logo from './Logo';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { setAuthModalOpen } from '../redux/features/authModalSlice';

const actionState = {
  signin: 'signin',
  signup: 'signup'
};
const AuthModal = () => {
  const dispatch = useDispatch();
  const { authModalOpen } = useSelector(state => state.authModal);

  const handleCloseAuthModal = () => dispatch(setAuthModalOpen(false));

  const [action, setAction] = useState(actionState.signin);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const switchAuthState = (state) => setAction(state);
  return (
    <Modal open={authModalOpen} onClose={handleCloseAuthModal}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '100%',
        maxWidth: '600px',
        padding: 4,
        outline: 'none'
      }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: 'background.paper' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Logo/>
          </Box>
          {/* handle switch form signin and signup */}
          {
            action === actionState.signin && <SigninForm switchAuthState={
              () => switchAuthState(actionState.signup)
            } />
          }
          {
            action === actionState.signup && <SignupForm switchAuthState={
              () => switchAuthState(actionState.signin)
            }/>
          }
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;