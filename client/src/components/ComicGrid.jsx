import { SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import comicApi from '../apis/modules/comic.api';
import { toast } from 'react-toastify';
import NavigationSwiper from './NavigationSwiper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ComicItemGrid from './ComicItemGrid';


const ComicGrid = ({ comicType }) => {

  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getComicsTrending = async () => {
      try {
        const { response, err } = await comicApi.getType({ comicType, page: 1 });
        if (err) {
          toast.error(err.message);
        } else if (response) {
          setComics(response.comics);
        }
      } catch {
        toast.error('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };
    getComicsTrending();
  }, [comicType]);

  if (isLoading) return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CircularProgress />
    </Box>
  );


  return (
    <NavigationSwiper>
      {comics?.map((comic, index) => (
        <SwiperSlide key={index}>
          <ComicItemGrid comic={comic} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default ComicGrid;