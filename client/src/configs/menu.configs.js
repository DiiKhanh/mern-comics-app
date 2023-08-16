import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

const main = [
  {
    display: 'home',
    path: '/',
    icon: <HomeOutlinedIcon />,
    state: 'home'
  },
  {
    display: 'genres',
    path: '/genres/all',
    icon: <CategoryIcon />,
    state: 'genres'
  },
  {
    display: 'top',
    path: '/top/all',
    icon: <NorthEastIcon />,
    state: 'top'
  },
  {
    display: 'search',
    path: '/search',
    icon: <SearchOutlinedIcon />,
    state: 'search'
  }
];

const user = [
  {
    display: 'favorites',
    path: '/favorites',
    icon: <FavoriteBorderOutlinedIcon />,
    state: 'favorite'
  },
  {
    display: 'reviews',
    path: '/reviews',
    icon: <RateReviewOutlinedIcon />,
    state: 'reviews'
  },
  {
    display: 'password update',
    path: '/password-update',
    icon: <LockResetOutlinedIcon />,
    state: 'password.update'
  }
];

const menuConfigs = { main, user };

export default menuConfigs;