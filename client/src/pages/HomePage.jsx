import Container from '@mui/material/Container';
import ContainerBox from '../components/ContainerBox';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ComicSlide from '../components/ComicSlide';
import comicConfigs from '../apis/configs/comic.config';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ComicGrid from '../components/ComicGrid';

const HomePage = () => {
  return (
    <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
      {/* trending auto swiper */}
      <ContainerBox header='Trending' icon={<TrendingUpIcon />}>
        <ComicSlide comicType={comicConfigs.comicType.popular}/>
      </ContainerBox>
      {/* popular navigation swiper grid*/}
      <ContainerBox header='Popular comics' icon={<LocalFireDepartmentIcon />}>
        <ComicGrid comicType={comicConfigs.comicType.trending}/>
      </ContainerBox>
    </Container>
  );
};

export default HomePage;