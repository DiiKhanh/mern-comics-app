import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setGlobalLoading } from '../redux/features/gloabalLoadingSlice';
import { setAppState } from '../redux/features/appStateSlice';
import comicApi from '../apis/modules/comic.api';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { routesGen } from '../routes/routes';


const ComicRead = () => {
  const dispatch = useDispatch();

  const { comicId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const currentPageRef = useRef(0);
  const imageRefs = useRef([]);

  useEffect(() => {
    dispatch(setAppState(''));
    const getChapter = async () => {
      try {
        dispatch(setGlobalLoading(true));
        const { response, err } = await comicApi.getChapterDetail({ comicId, chapterId });
        if (response) {
          setChapter(response);
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
                backgroundColor: '#333',
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

              <Box sx={{ position: 'fixed', bottom: 0, insetInline: 0, width:'100%', display:'flex', alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#9ca3af'
              }}>
                {/* control */}
                <Box sx={{ display:'flex', alignItems:'center', width: 300, gap:'5px' }}>
                  <Typography id="non-linear-slider" width={80}>
                    {currentPage} / {chapter?.images?.length}
                  </Typography>
                  <Slider
                    value={currentPage}
                    min={1}
                    step={1}
                    max={chapter?.images?.length}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                  />
                </Box>
                {/* control */}

              </Box>
            </Box>
          </Container>
      }
    </>
  );
};

export default ComicRead;