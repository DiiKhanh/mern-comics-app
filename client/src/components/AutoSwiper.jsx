import Box from '@mui/material/Box';
import { Swiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const AutoSwiper = ({ children }) => {
  return (
    <Box
      sx={{
        '& .swiper-slide': {
          width: {
            xs: '50%',
            sm: '35%',
            md: '25%',
            lg: '20.5%'
          }
        }
      }}
    >
      <Swiper
        slidesPerView='auto'
        grabCursor={true}
        // spaceBetween={30}
        style={{ width:'100%', height: 'max-content' }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50
          }
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        modules={[Autoplay]}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;