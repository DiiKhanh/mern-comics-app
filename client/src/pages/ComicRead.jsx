import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { setAppState } from '../redux/features/appStateSlice';
import comicApi from '../apis/modules/comic.api';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { routesGen } from '../routes/routes';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const ComicRead = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { comicId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const currentPageRef = useRef(0);
  const imageRefs = useRef([]);
  const chapters = chapter?.chapters;

  const [allChapter, setAllChapter] = useState([]);

  const [value, setValue] = useState({
    id: chapterId,
    name: chapter?.chapter_name
  });


  useEffect(() => {
    dispatch(setAppState(''));
    const getChapter = async () => {
      try {
        dispatch(setGlobalLoading(true));
        const { response, err } = await comicApi.getChapterDetail({ comicId, chapterId });
        if (response) {
          setChapter(response);
          setAllChapter([...response.chapters].reverse());
        }
        if (err) {
          toast.error(err.message);
        }
      } catch {
        toast.error('An error occurred while fetching data.');
      } finally {
        dispatch(setGlobalLoading(false));
        currentPageRef.current = 0;
        window.scrollTo({ top: 0, behavior:'smooth' });
      }
    };
    getChapter();
  }, [comicId, chapterId, dispatch]);


  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number' && imageRefs.current[newValue]) {
      imageRefs.current[newValue].scrollIntoView();
      currentPageRef.current = newValue;
      setCurrentPage(currentPageRef.current);
    }
  };

  const handleChangeChapter = (e) => {
    setValue({ ...value, id: e.target.value.id, name: e.target.value.name });
    navigate(`/comic/${comicId}/${e.target.value.id}`);
  };


  const handleChangeEpisode = (type) => {
    const episode = [...chapters].reverse();
    const chapterIdx = episode.findIndex((c) => c.id === Number(chapterId));
    const nextChapterIdx = chapterIdx + (type === 'next' ? 1 : -1);
    if (nextChapterIdx === -1) return;
    if (episode[nextChapterIdx].id === undefined) return;
    navigate(`/comic/${comicId}/${episode[nextChapterIdx].id}`);
  };

  useEffect(() => {
    let firstRender = true;

    const getElementsPos = () => {
      const elements = document.querySelectorAll('.image-source');
      const foundEle = Array.from(elements).find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top > 0;
      });
      if (foundEle) {
        setCurrentPage(Number(foundEle.getAttribute('id')));
        return;
      }
      if (firstRender) {
        setCurrentPage(1);
        firstRender = false;
        return;
      }
      setCurrentPage(elements.length);
    };
    document.addEventListener('scroll', getElementsPos);
    return () => {
      document.removeEventListener('scroll', getElementsPos);
    };
  }, [currentPage]);


  return (
    <>
      {
        chapter &&
          <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
            <Box sx={{ minHeight: '100vh', position: 'relative', userSelect:'none' }}>
              <Box sx={{
                color: (theme) => theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                rowGap: '5px',
                backgroundColor:'#9ca3af',
                paddingY: '0.725rem',
                flexWrap:'wrap'
              }}>
                <Typography sx={{ fontSize: '1.1rem', lineHeight: '1.25rem', cursor: 'pointer', textDecoration:'none' }}
                  component={Link}
                  to={routesGen.comicDetail(comicId)}
                  color='inherit'
                >{chapter?.comic_name}</Typography>
                <Typography sx={{ fontSize: '1rem', lineHeight: '1.25rem', marginX:'10px' }}>{' > '}</Typography>
                <Typography sx={{ fontSize: '1.1rem', lineHeight: '1.25rem' }}>{chapter?.chapter_name}</Typography>
              </Box>

              <Box sx={{ marginX: 'auto', display: 'flex', flexDirection:'column', maxWidth:'42rem' }}>
                {
                  chapter.images?.map((item, index) => (
                    <React.Fragment key={item?.src}>
                      <img src={item?.src} alt={`page ${item?.page}`} loading='lazy'
                        id={item?.page}
                        style={{ width: '100%', height: 'auto', maxWidth:'100%',
                          display:'block', verticalAlign:'middle'
                        }}
                        className='image-source'
                        ref={(el) => (imageRefs.current[index+1] = el)}
                      />
                    </React.Fragment>
                  ))
                }
              </Box>

              <Box sx={{ position: 'absolute', bottom: 0, top: 0, width:'100%', minHeight:'100vh',
                backgroundColor:'#333', zIndex:-99
              }}></Box>
              <Box sx={{ position: 'fixed', bottom: 0, insetInline: 0, width:'100%', display:'flex', alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#9ca3af',
                gap: '5px',
                flexWrap:'wrap',
                opacity:'0.9'
              }}>
                {/* control */}
                <Box sx={{ display:'flex', alignItems:'center', width: 300, gap:'5px' }}>
                  <Typography id='non-linear-slider' width={80}>
                    {currentPage} / {chapter?.images?.length}
                  </Typography>
                  <Slider
                    value={currentPage}
                    min={1}
                    step={1}
                    max={chapter?.images?.length}
                    onChange={handleChange}
                    valueLabelDisplay='auto'
                    aria-labelledby='non-linear-slider'
                  />
                </Box>
                {/* control */}
                <Box sx={{ display:'flex', alignItems:'center', gap:'5px', maxWidth:'80px', paddingY:'5px' }}>
                  <Button variant='contained' startIcon={<ArrowBackIosIcon />}
                    onClick={() => handleChangeEpisode('prev')}
                    disabled={chapterId == chapters.at(-1).id}
                  />
                  <Button variant='contained' endIcon={<ArrowForwardIosIcon />}
                    onClick={() => handleChangeEpisode('next')}
                    disabled={chapterId == chapters[0].id}
                  />
                </Box>

                <FormControl sx={{ ml: '60px', minWidth: 120, py: '10px' }} size='small'>
                  <InputLabel id='demo-simple-select-label'>{value['name']}</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={value['name']}
                    label={value['name']}
                    onChange={handleChangeChapter}
                    MenuProps={MenuProps}
                  >
                    {
                      allChapter?.map((c, i) => (
                        <MenuItem value={c} key={i}>{c.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Container>
      }
    </>
  );
};

export default ComicRead;