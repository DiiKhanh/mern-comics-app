import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import TextAvatar from './TextAvatar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { Link } from 'react-router-dom';
import menuConfigs from '../configs/menu.configs';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { toast } from 'react-toastify';


const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignout = () => {
    dispatch(setUser(null));
    toast.success('Sign out success');
  };

  return (
    <>
      {
        user && <>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <TextAvatar text={user?.displayName}/>
                <Typography sx={{ marginLeft: '5px', fontSize:'16px' }}>{user?.displayName}</Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menuConfigs.user.map((item, index) => (
                <ListItemButton
                  component={Link}
                  to={item.path}
                  key={index}
                  onClick={() => setAnchorElUser(null)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText disableTypography primary={
                    <Typography textTransform='uppercase'>{item.display}</Typography>
                  } />
                </ListItemButton>
              ))}
              <ListItemButton
                sx={{ borderRadius: '10px' }}
                onClick={handleSignout}
              >
                <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
                <ListItemText disableTypography primary={
                  <Typography textTransform='uppercase'>sign out</Typography>
                }/>
              </ListItemButton>
            </Menu>
          </Box>
        </>
      }
    </>
  );
};

export default UserMenu;