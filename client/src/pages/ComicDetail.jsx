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
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { LoadingButton } from '@mui/lab';
import Stack from '@mui/material/Stack';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import DownloadIcon from '@mui/icons-material/Download';
import { setAppState } from '../redux/features/appStateSlice';
import ChapterList from '../components/ChapterList';
import Divider from '@mui/material/Divider';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ComicReview from '../components/ComicReview';
import ContainerBox from '../components/ContainerBox';
import comicConfigs from '../apis/configs/comic.config';
import ComicSlide from '../components/ComicSlide';
import RecommendSlide from '../components/RecommendSlide';
import Helmet from '../components/Helmet';

const ComicDetail = () => {
  const { comicId } = useParams();

  const dispatch = useDispatch();

  const { user, listFavorites } = useSelector(state => state.user);

  const [comic, setComic] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);
  const [chapters, setChapters] = useState([]);

  const [show, setShow] = useState(false);

  const setClickShow = () => {
    setShow(prev => !prev);
  };

  useEffect(() => {
    dispatch(setAppState(''));
    const getComic = async () => {
      try {
        dispatch(setGlobalLoading(true));
        const { response, err } = await comicApi.getComicDetail({ comicId });
        if (response) {
          setComic(response);
          setIsFavorite(response.isFavorite);
          setGenres(response.genres);
          setChapters(response.chapters);
        }
        if (err) {
          toast.error(err.message);
        }
      } catch {
        toast.error('An error occurred while fetching data.');
      } finally {
        dispatch(setGlobalLoading(false));
        window.scrollTo({ top: 0, behavior:'smooth' });
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
      comicId: comic?.id,
      comicTitle: comic?.title,
      comicThumbnail: comic?.thumbnail,
      comicStatus: comic?.status,
      comicViews: comic?.total_views,
      comicFollowers: comic?.followers,
      comicUpdate: comic?.status
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
      (e) => e.comicId === comic.id
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
    comic ? (

      <Helmet title={comic?.title}>
        <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
          <Box sx={{ color: 'primary.contrastText', position: 'relative',
            ...uiConfigs.style.mainContent }} >
            {/* media content */}
            <Box sx={{ ...uiConfigs.backgroundDetail }}></Box>
            {/* grid */}
            <Grid container spacing={5} sx={{ justifyContent:'center' }}>
              <Grid item>
                <Box sx={{
                  width: { sm:'100%', xs:'14rem' },
                  aspectRatio:'2/3',
                  marginX:'auto',
                  border:'2px solid #55E6C1',
                  borderRadius:'0.5rem',
                  overflow:'hidden'
                }}>
                  <img alt={comic?.title} src={comic?.thumbnail}
                    style={{ maxWidth:'100%', height:'100%', objectFit:'cover' }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm container>
                <Grid item xs container direction='column' spacing={4}>
                  <Grid item xs>
                    <Typography gutterBottom variant='subtitle1'
                      sx={{
                        fontSize:'1.875rem',
                        lineHeight:'2.25rem',
                        fontWeight:'800'
                      }}
                    >
                      {
                        comic?.title
                      }
                    </Typography>
                    <Typography variant='subtitle2'
                      sx={{ fontWeight: '400', lineHeight:'1.125rem', marginBottom:'20px' }}
                    >
                      {
                        comic?.other_names.join(' | ')
                      }
                    </Typography>
                    <Box display='flex' alignItems='center' flexWrap='wrap' gap={1}>
                      {
                        genres?.map((g, i) => (
                          <Button key={i} sx={{
                            backgroundColor:'transparent',
                            color:'inherit',
                            border: '2px solid #55E6C1',
                            '&:hover' : {
                              backgroundColor:'#55E6C1'
                            }
                          }}>
                            {g.name}
                          </Button>
                        ))
                      }
                    </Box>
                    <Typography marginY={1} fontWeight='600'>
                      Tác giả: {comic?.authors}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems:'center', gap: '15px' }} className='title'>
                      <Box sx={{ display: 'flex', alignItems:'center', gap:'5px' }}>
                        <RemoveRedEyeIcon fontSize='medium' sx={{ color:'blue' }}/><Typography
                          sx={{ fontSize: '16px' }}
                        >{comic?.total_views.toLocaleString()}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems:'center', gap:'5px' }}>
                        <ThumbUpIcon fontSize='medium' sx={{ color: '#ff6b6b' }} /><Typography
                          sx={{ fontSize: '16px' }}
                        >{ comic?.followers.toLocaleString()}</Typography>
                      </Box>
                    </Box>
                    <Box marginY={3}>
                      <Typography sx={{
                        display: `${show ? 'block' : '-webkit-box'}`,
                        WebkitBoxOrient: `${show ? 'horizontal' : 'vertical'}`,
                        WebkitLineClamp: `${show ? 'none' : '3'}`,
                        overflow:`${show ? 'visible' : 'hidden'}`
                      }} variant='inherit'>
                        {comic?.description.replace(/NetTruyen/g, 'KComics')}
                      </Typography>
                      <Button onClick={setClickShow} sx={{ padding:0 }}>
                        { show ? 'Show less' : 'Show more' }
                      </Button>
                    </Box>
                    {/* buttons */}
                    <Stack direction='row' spacing={1}>
                      <LoadingButton
                        variant='text'
                        sx={{
                          width: 'max-content',
                          '& .MuiButon-starIcon': { marginRight: '0' }
                        }}
                        size='large'
                        startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                        loadingPosition='start'
                        loading={onRequest}
                        onClick={onFavoriteClick}
                      />
                      <Button
                        variant='contained'
                        sx={{ width: 'max-content' }}
                        size='large'
                        startIcon={<TurnedInNotIcon />}
                      >
                      read now
                      </Button>
                      <Button
                        variant='outlined'
                        sx={{ width: 'max-content' }}
                        size='large'
                        startIcon={<DownloadIcon />}
                      >
                      download now
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ marginTop:'1.25rem', maxWidth:'64rem', marginX:'auto' }}>
              <Button sx={{ fontSize:'1.2rem' }} startIcon={<ImportContactsIcon/>}>Chapters</Button>
              <Divider sx={{ borderWidth: '3px', width:'100%' }}/>
              <ChapterList chapters={chapters} comicId={comic?.id}/>
            </Box>

            <ComicReview reviews={comic?.reviews} comic={comic} />

            <ContainerBox header="you may also like" icon={<ThumbUpIcon />}>
              {comic.recommend.length > 0 && (
                <RecommendSlide comics={comic.recommend} />
              )}
              {comic.recommend.length === 0 && (
                <ComicSlide comicType={comicConfigs.comicType.popular}/>
              )}
            </ContainerBox>

          </Box>
        </Container>
      </Helmet>
    ) : null
  );
};

export default ComicDetail;