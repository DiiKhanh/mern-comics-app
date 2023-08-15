import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      {/* loading */}
      {/* login */}
      {/* login */}
      {/* view  */}
      <Box display='flex' minHeight='100vh'>
        {/* Header */}
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