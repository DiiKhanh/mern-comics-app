import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { routesGen } from '../routes/routes';

const ComicItem = ({ comic }) => {
  return (
    <>
      <Link to={routesGen.comicDetail(comic?.id)}>
        <Card sx={{ maxWidth: 300, position: 'relative', transition: 'all .2s ease',
          '&:hover .title': {
            color: (theme) => theme.palette.primary.main
          }
        }}>
          <CardMedia
            sx={{ height: 350, objectFit: 'cover', objectPosition: 'center', transition: 'all .2s ease',
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
                  bgcolor: 'yellow',
                  borderRadius: '4px'
                }}
              >Up</Typography>
            }
          </Box>
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            insetInline: 0,
            backgroundImage: 'linear-gradient(to bottom, transparent, black)',
            color: '#fff',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            flexDirection: 'column',
            padding: '4px 8px'
          }}>
            <Typography className='title' variant='h6' sx={{
              overflow: 'hidden',
              fontSize: '16px',
              textShadow: '2px 2px #333',
              color: 'white'
            }}>{comic?.title}</Typography>
          </Box>
        </Card>
      </Link>
    </>
  );

};

export default ComicItem;