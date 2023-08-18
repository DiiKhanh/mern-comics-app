
import { SwiperSlide } from 'swiper/react';
import AutoSwiper from './AutoSwiper';
import ComicItem from './ComicItem';
import { useEffect, useState } from 'react';
import comicApi from '../apis/modules/comic.api';
import { toast } from 'react-toastify';


const ComicSlide = ({ comicType }) => {

  const [comics, setComics] = useState([]);

  useEffect(() => {
    const getComicsTrending = async () => {
      const { response, err } = await comicApi.getTrending({ comicType });
      if (response) {
        if (response.comics?.length > 15) {
          setComics(response.comics.slice(0, 15));
        }
        else {
          setComics(response.comics);
        }
      }
      if (err) toast.error(err.message);
    };
    getComicsTrending();
  }, [comicType]);

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