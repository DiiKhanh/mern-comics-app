import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Logo from './Logo';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [globalLoading]);

  return (
    <>
      <Paper sx={{
        pointerEvents: 'none',
        zIndex: 999,
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        transition: 'all 0.3s ease',
        opacity: isLoading ? 1 : 0
      }}>
        <Toolbar/>
        <LinearProgress />
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <Logo />
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;