import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import GlobalLoading from '../components/GlobalLoading';
import TopBar from '../components/TopBar';
import AuthModal from '../components/AuthModal';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../apis/modules/user.api';
import { useEffect } from 'react';
import { setUser, setListFavorites } from '../redux/features/userSlice';
import favoriteApi from '../apis/modules/favorite.api';
import { toast } from 'react-toastify';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();
      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };
    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();
      if (response) dispatch(setListFavorites(response));
      if (err) toast.error(err.message);
    };

    if (user) getFavorites();
    if (!user) dispatch(setListFavorites([]));

  }, [user, dispatch]);

  return (
    <>
      {/* loading */}
      <GlobalLoading />
      {/* login */}
      <AuthModal />
      {/* login */}
      {/* view  */}
      <Box display='flex' minHeight='100vh'>
        {/* Header */}
        <TopBar />
        {/* Header */}
        {/* main */}
        <Box component='main' flexGrow={1} overflow='hidden' minHeight='100vh'>
          <Outlet/>
        </Box>
        {/* main */}
      </Box>
      {/* view  */}
      {/* Footer */}
      <Footer />
      {/* Footer */}
    </>
  );
};

export default MainLayout;