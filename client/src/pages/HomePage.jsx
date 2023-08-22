import Container from '@mui/material/Container';
import ContainerBox from '../components/ContainerBox';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ComicSlide from '../components/ComicSlide';
import comicConfigs from '../apis/configs/comic.config';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ComicGrid from '../components/ComicGrid';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

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
      {/* completed */}
      <ContainerBox header='Completed comics' icon={<TaskAltIcon />}>
        <ComicGrid comicType={comicConfigs.comicType.completed}/>
      </ContainerBox>
      {/* recent */}
      <ContainerBox header='Recently comics' icon={<ReplayIcon />}>
        <ComicGrid comicType={comicConfigs.comicType.recent}/>
      </ContainerBox>
      {/* boy */}
      <ContainerBox header='boy comics' icon={<MaleIcon />}>
        <ComicGrid comicType={comicConfigs.comicType.boy}/>
      </ContainerBox>
      {/* girl */}
      <ContainerBox header='girl comics' icon={<FemaleIcon />}>
        <ComicGrid comicType={comicConfigs.comicType.girl}/>
      </ContainerBox>
    </Container>
  );
};

export default HomePage;