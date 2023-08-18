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
            lg: '16.5%'
          }
        }
      }}
    >
      <Swiper
        slidesPerView='auto'
        grabCursor={true}
        spaceBetween={20}
        style={{ width:'100%', height: 'max-content' }}
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