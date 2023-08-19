import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { routesGen } from '../routes/routes';
import FavoriteIcon from '@mui/icons-material/Favorite';
import favoriteUtils from '../utils/favorite.utils';
import { useSelector } from 'react-redux';

const ComicItem = ({ comic }) => {
  const { listFavorites } = useSelector(state => state.user);
  return (
    <>
      <Link to={routesGen.comicDetail(comic?.id)}>
        <Card sx={{ maxWidth: { xs: 200, md: 300 }, position: 'relative', transition: 'all .2s ease',
          '&:hover .title': {
            color: (theme) => theme.palette.primary.main
          },
          sm: { maxWidth: 250 }
        }}>
          <CardMedia
            sx={{ height: { xs: 250, md: 350 }, objectFit: 'cover', objectPosition: 'center', transition: 'all .2s ease',
              '&:hover' : {
                scale: '1.05'
              }

            }}
            image={comic?.thumbnail}
            title={comic?.title}
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
            alignItems: 'center',
            justifyContent: 'flex-end',
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

export default ComicItem;