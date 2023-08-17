import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ComicItem = ({ comic }) => {
  return (
    <Card sx={{ maxWidth: 300, position: 'relative' }}>
      <CardMedia
        sx={{ height: 350, opacity: 0.95 }}
        image={comic?.thumbnail}
        title={comic?.title}
      />
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        {
          comic.is_trending && <Typography
            variant='subtitle2' sx={{
              padding: '4px 10px',
              bgcolor: 'red',
              color: 'white'
            }}
          >Hot</Typography>
        }
      </Box>
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        color: '#fff',
        fontWeight: 'bold'
      }}>
        <Typography variant='h6'>{comic?.title}</Typography>
      </Box>
    </Card>
  );
};

export default ComicItem;