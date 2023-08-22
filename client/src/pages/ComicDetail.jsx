import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { setGlobalLoading } from '../redux/features/gloabalLoadingSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import comicApi from '../apis/modules/comic.api';
import favoriteApi from '../apis/modules/favorite.api';
import uiConfigs from '../configs/ui.configs';

const ComicDetail = () => {
  const { comicId } = useParams();

  const dispatch = useDispatch();

  const { user, listFavorites } = useSelector(state => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getComic = async () => {
      try {
        dispatch(setGlobalLoading(true));
        const { response, err } = await comicApi.getComicDetail({ comicId });
        if (response) {
          setMedia(response);
          setIsFavorite(response.isFavorite);
          setGenres(response.genres);
        }
        if (err) {
          toast.error(err.message);
        }
      } catch {
        toast.error('An error occurred while fetching data.');
      } finally {
        dispatch(setGlobalLoading(false));
        window.scrollTo(0, 0);
      }
    };
    getComic();
  }, [comicId, dispatch]);


  const onFavoriteClick = async () => {
    if (!user) {
      dispatch(setAuthModalOpen(true));
      return;
    }
    if (onRequest) {
      return;
    }
    setOnRequest(true);

    const favoriteAction = isFavorite ? onRemoveFavorite : onAddFavorite;
    await favoriteAction();

    setOnRequest(false);
  };

  const onAddFavorite = async () => {
    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path || media.backdrop_path,
      mediaRate: media.vote_average
    };

    const { response, err } = await favoriteApi.add(body);

    if (err) {
      toast.error(err.message);
    } else if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success('Add favorite success');
    }
  };

  const onRemoveFavorite = async () => {
    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );

    const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id });

    if (err) {
      toast.error(err.message);
    } else if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success('Remove favorite success');
    }
  };

  return (
    media ? (
      <>
        <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
          <Box sx={{ color: 'primary.contrastText', position: 'relative',
            ...uiConfigs.style.mainContent }} >
            {/* media content */}
            <Box sx={{
              ...uiConfigs.backgroundDetail
            }}></Box>
            <Box sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' }
            }}>
              Content
            </Box>
          </Box>
        </Container>
      </>
    ) : null
  );
};

export default ComicDetail;