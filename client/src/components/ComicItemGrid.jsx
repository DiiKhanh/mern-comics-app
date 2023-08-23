import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { routesGen } from '../routes/routes';
import FavoriteIcon from '@mui/icons-material/Favorite';
import favoriteUtils from '../utils/favorite.utils';
import { useSelector } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Divider } from '@mui/material';

const ComicItemGrid = ({ comic }) => {
  const { listFavorites } = useSelector(state => state.user);
  return (
    <>
      <Link to={routesGen.comicDetail(comic?.id)}>
        <Card sx={{ maxWidth: { xs: 200, md: 300 }, position: 'relative', transition: 'all .2s ease',
          '&:hover .title': {
            color: (theme) => theme.palette.primary.main
          }
        }}>
          <CardMedia
            sx={{ height: { xs: 250, md: 350 }, objectFit: 'cover', objectPosition: 'center', transition: 'all .3s ease',
              transformOrigin: 'bottom',
              '&:hover' : {
                scale: '1.05'
              }
            }}
            image={comic?.thumbnail}
            title={comic?.title}
            component='img'
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            insetInline: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            color: 'white',
            gap: 1
          }}>
            {
              comic.is_trending && <Typography
                variant='subtitle2' sx={{
                  padding: '2px 10px',
                  bgcolor: 'red',
                  borderRadius: '4px'
                }}
              >Hot</Typography>
            }
            {
              comic?.status === 'Completed' && <Typography
                variant='subtitle2' sx={{
                  padding: '2px 10px',
                  bgcolor: 'skyblue',
                  borderRadius: '4px'
                }}
              >End</Typography>
            }
            {
              comic?.updated_at.includes('trước') && Number(comic?.updated_at.match(/\d+/)?.[0]) <= 3 && <Typography
                variant='subtitle2' sx={{
                  padding: '2px 10px',
                  bgcolor: '#fbbf24',
                  borderRadius: '4px'
                }}
              >Up</Typography>
            }
          </Box>
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: 'linear-gradient(to bottom, transparent, black)',
            color: '#fff',
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 32px'
          }}>
            <Typography className='title' variant='h6' sx={{
              overflow: 'hidden',
              textShadow: '2px 2px #333',
              fontSize: '1.05rem',
              color: 'white',
              fontWeight: '700',
              lineHeight: '1.25rem',
              transitionDuration: '.2s',
              display: '-webkit-box',
              '-webkit-box-orient': 'vertical',
              '-webkit-line-clamp': '2'
            }}>{comic?.title}</Typography>
            <Divider sx={{ border:'1px solid gray', marginBottom: '0.5rem', marginTop:'1rem' }} />
            <Box className='title'>
              <Typography fontSize='14px' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{
                comic?.genres.map((g) => g.name).join(' | ')
              }</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems:'center', justifyContent:'center', gap: '15px', paddingTop: '10px' }} className='title'>
              <Box sx={{ display: 'flex', alignItems:'center', gap:'5px' }}>
                <RemoveRedEyeIcon fontSize='small' /><Typography
                  sx={{ fontSize: '14px' }}
                >{Intl.NumberFormat('en', { notation: 'compact' }).format(
                    comic?.total_views)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems:'center', gap:'5px' }}>
                <ThumbUpIcon fontSize='small' /><Typography
                  sx={{ fontSize: '14px' }}
                >{Intl.NumberFormat('en', { notation: 'compact' }).format(
                    comic?.followers)}</Typography>
              </Box>
            </Box>
          </Box>
          {
            favoriteUtils.check({ listFavorites, comicId: comic.id })
              && <FavoriteIcon
                color='primary'
                sx={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  fontSize: '2rem'
                }}
              />
          }
        </Card>
      </Link>
    </>
  );

};

export default ComicItemGrid;