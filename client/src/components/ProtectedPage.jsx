import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../redux/features/authModalSlice.js';

const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // check if dont have account can not access private
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return (
    user ? children : null
  );
};

export default ProtectedPage;