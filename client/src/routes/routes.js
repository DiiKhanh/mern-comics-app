import HomePage from '../pages/HomePage';
import ComicSearch from '../pages/ComicSearch';
import FavoriteList from '../pages/FavoriteList';
import PasswordUpdate from '../pages/PasswordUpdate';
import ReviewList from '../pages/ReviewList';
import ComicGenres from '../pages/ComicGenres';
import ComicTop from '../pages/ComicTop';
import ComicDetail from '../pages/ComicDetail';
import ComicRead from '../pages/ComicRead';
import ProtectedPage from '../components/ProtectedPage';

export const routesGen = {
  home: '/',
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: 'password-update'
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: 'home'
  },
  {
    path: '/search',
    element: <ComicSearch />,
    state: 'search'
  },
  {
    path: '/password-update',
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: 'password.update'
  },
  {
    path: '/favorites',
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: 'favorites'
  },
  {
    path: '/reviews',
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: 'reviews'
  },
  {
    path: '/genres/:genreId',
    element: <ComicGenres />
  },
  {
    path: '/top/:topType',
    element: <ComicTop />
  },
  {
    path: '/comic/:comicId',
    element: <ComicDetail />
  },
  {
    path: '/comic/:comicId/:chapterId',
    element: <ComicRead />
  }
];

export default routes;