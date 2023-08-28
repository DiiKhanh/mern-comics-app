import { cloneElement, useState } from 'react';
import { useScrollTrigger, useColorScheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';
import SwitchMode from './SwitchMode';
import Logo from './Logo';
import UserMenu from './UserMenu';
import menuConfigs from '../configs/menu.configs';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import SideBar from './SideBar';
import Fade from '@mui/material/Fade';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollTopBar = ({ children, window }) => {
  const { mode } = useColorScheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined
  });

  return (
    cloneElement(children, {
      elevation: trigger ? 5 : 0,
      sx: {
        color: trigger ? 'text.primary' : mode === 'dark' ? 'primary.contrastText' : 'text.primary',
        backgroundColor: trigger ? 'background.paper' : mode === 'dark' ? 'transparent' : 'background.paper'
      }
    }
    )
  );
};

const ScrollTop = ({ children, window }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 50
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: 'fixed', bottom: 32, right: 16, zIndex:999 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

const TopBar = () => {
  const dispatch = useDispatch();
  const { appState } = useSelector(state => state.appState);
  const { user } = useSelector(state => state.user);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { mode } = useColorScheme();

  return (
    <>
      <SideBar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <Toolbar id='back-to-top-anchor'/>
      <ScrollTopBar>
        <AppBar sx={{ zIndex: 999 }}>
          <Container maxWidth='xl'>
            <Toolbar sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              {/* mobile */}
              <Stack direction='row' spacing={1} alignItems='center'>
                <IconButton
                  color='inherit'
                  sx={{ mr: 2, display: { md: 'none' } }}
                  onClick={toggleSidebar}
                >
                  <MenuIcon/>
                </IconButton>
                <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                  <Logo/>
                </Box>
              </Stack>
              {/* mobile */}
              {/* pc */}
              <Box
                flexGrow={1} alignItems='center'
                sx={{
                  display: { xs: 'none', md: 'flex' }
                }}>
                <Box sx={{ marginRight: '20px', gap: '10px' }} display='flex' alignItems='center'>
                  <AutoStoriesIcon/>
                  <Logo />
                </Box>
                {
                  menuConfigs.main.map((item, index) => (
                    <Button key={index}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit',
                        mr: 2,
                        transition: 'all 0.2s ease',
                        ' &:hover':{
                          background:(theme) => theme.palette.primary.main
                        }
                      }}
                      variant={appState.includes(item.state) ? 'contained' : 'text'}
                    >
                      {item.display}
                    </Button>
                  ))
                }
                <SwitchMode />
              </Box>
              {/* user menu */}
              <Stack spacing={3} direction='row' alignItems='center'>
                {!user && <Button
                  variant='contained'
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                sign in
                </Button>}
              </Stack>
              {
                user && <UserMenu />
              }
            </Toolbar>
          </Container>
        </AppBar>
      </ScrollTopBar>
      <ScrollTop>
        <Fab size='small' aria-label='scroll back to top'
          sx={{
            bgcolor: mode === 'dark' ? 'primary.main' : 'primary.main'
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};
export default TopBar;