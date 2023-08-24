import { SwiperSlide } from 'swiper/react';
import AutoSwiper from './AutoSwiper';
import ComicItem from './ComicItem';

const RecommendSlide = ({ comics }) => {
  return (
    <AutoSwiper>
      {comics.map((comic, index) => (
        <SwiperSlide key={index}>
          <ComicItem comic={comic} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;