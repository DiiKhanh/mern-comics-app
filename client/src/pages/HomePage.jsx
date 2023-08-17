import Container from '@mui/material/Container';
import ContainerBox from '../components/ContainerBox';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ComicSlide from '../components/ComicSlide';
import comicConfigs from '../apis/configs/comic.config';

const HomePage = () => {
  return (
    <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
      {/* trending auto swiper */}
      <ContainerBox header='Trending' icon={<TrendingUpIcon/>}>
        <ComicSlide comicType={comicConfigs.comicType.trending}/>
      </ContainerBox>
      {/* popular navigation swiper grid*/}
    </Container>
  );
};

export default HomePage;