import { SwiperSlide } from 'swiper/react';
import AutoSwiper from './AutoSwiper';
import ComicItem from './ComicItem';
import { useEffect, useState } from 'react';
import comicApi from '../apis/modules/comic.api';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ComicSlide = ({ comicType }) => {

  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getComicsTrending = async () => {
      try {
        const { response, err } = await comicApi.getPopular({ comicType });
        if (err) {
          toast.error(err.message);
        } else if (response) {
          setComics(response);
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
    <AutoSwiper>
      {comics?.map((comic, index) => (
        <SwiperSlide key={index + comic.id}>
          <ComicItem comic={comic} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default ComicSlide;