import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import GlobalLoading from '../components/GlobalLoading';
import TopBar from '../components/TopBar';
import AuthModal from '../components/AuthModal';

const MainLayout = () => {
  return (
    <>
      {/* loading */}
      <GlobalLoading />
      {/* login */}
      <AuthModal />
      {/* login */}
      {/* view  */}
      <Box display='flex' minHeight='100vh' height='1000px'>
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
      {/* Footer */}
    </>
  );
};

export default MainLayout;