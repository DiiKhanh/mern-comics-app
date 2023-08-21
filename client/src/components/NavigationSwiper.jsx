import Box from '@mui/material/Box';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import { Swiper } from 'swiper/react';

const NavigationSwiper = ({ children }) => {
  return (
    <Box sx={{
      '& .swiper-slide': {
        textAlign: 'center',
        fontSize: '18px',
        // height: '250px',
        /* Center slide text vertically */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      '& .swiper-slide-active': { opacity: 1 },
      '& .swiper-pagination-bullet': {
        backgroundColor: 'primary.main'
      },
      '& .swiper-button-next, & .swiper-button-prev': {
        color: 'primary.main',
        '&::after': {
          fontSize: { xs: '1rem', md: '2rem' }
        }
      },
      '& .swiper': {
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    }}>
      <Swiper
        grabCursor={true}
        slidesPerView={5}
        grid={{
          rows: 2,
          fill: 'row'
        }}
        breakpoints={
          {
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
              grid: {
                rows: 1
              }
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
              grid: {
                rows: 1
              }
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 10,
              grid: {
                rows: 1
              }
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 15,
              grid: {
                rows: 2,
                fill: 'row'
              }
            },
            1024: {
              slidesPerView: 5,
              grid: {
                rows: 2,
                fill: 'row'
              }
            }
          }
        }
        spaceBetween={20}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Grid, Navigation, Pagination]}
        style={{ width: '100%', height: 'max-content' }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default NavigationSwiper;