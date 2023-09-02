import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import uiConfigs from '../configs/ui.configs';
import favoriteApi from '../apis/modules/favorite.api';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { removeFavorite } from '../redux/features/userSlice';
import ContainerBox from '../components/ContainerBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteItem from '../components/FavoriteItem';
import Helmet from '../components/Helmet';

const FavoriteItemPage = ({ comic, onRemoved }) => {
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({ favoriteId: comic.id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success('Remove favorite success');
      dispatch(removeFavorite({ comicId: comic.comicId }));
      onRemoved(comic.id);
    }
  };

  return (
    <>
      <FavoriteItem comic={comic} />
      <LoadingButton
        fullWidth
        variant='contained'
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition='start'
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </>);
};

const FavoriteList = () => {
  const [comics, setComics] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setComics([...response]);
        setFilteredComics([...response].splice(0, skip));
      }
    };

    getFavorites();
  }, [dispatch]);

  const onLoadMore = () => {
    setFilteredComics([...filteredComics, ...[...comics].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newComics = [...comics].filter(e => e.id !== id);
    setComics(newComics);
    setFilteredComics([...newComics].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Helmet title={'Favorites'}>
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <ContainerBox header={`Your favorites (${count})`} icon={<FavoriteIcon />}>
          <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
            {filteredComics.map((comic, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <FavoriteItemPage comic={comic} onRemoved={onRemoved} />
              </Grid>
            ))}
          </Grid>
          {filteredComics.length < comics.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </ContainerBox>
      </Box>
    </Helmet>
  );
};

export default FavoriteList;