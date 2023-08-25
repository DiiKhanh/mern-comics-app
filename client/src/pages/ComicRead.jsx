import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setGlobalLoading } from '../redux/features/gloabalLoadingSlice';
import { setAppState } from '../redux/features/appStateSlice';
import comicApi from '../apis/modules/comic.api';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const ComicRead = () => {
  const dispatch = useDispatch();

  const { comicId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);

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
        window.scrollTo({ top: 0, behavior:'smooth' });
      }
    };
    getChapter();
  }, [comicId, chapterId, dispatch]);

  console.log(chapter);

  return (
    <>
      {
        chapter &&
          <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
            <Box sx={{ minHeight: '100vh', position: 'relative' }}>
              <Box sx={{ marginX: 'auto', display: 'flex', flexDirection:'column', maxWidth:'42rem' }}>
                {
                  chapter.images?.map((item, i) => (
                    <React.Fragment key={i}>
                      <img src={item?.src} alt={item?.page} loading='lazy'
                        style={{ width: '100%', height: 'auto', maxWidth:'100%',
                          display:'block', verticalAlign:'middle'
                        }}
                      />
                    </React.Fragment>
                  ))
                }
              </Box>

              <Box sx={{ position: 'fixed', bottom: 0, insetInline: 0,
                padding: '0.5rem', width:'100%', background:'rgba(0,0,0,.75)'
              }}>
                <Box sx={{
                  fontSize: '1.05rem',
                  lineHeight: '1.25rem',
                  color: (theme) => theme.palette.primary.main
                }}>{chapter?.comic_name} {' > '} {chapter?.chapter_name} </Box>
              </Box>
            </Box>
          </Container>
      }
    </>
  );
};

export default ComicRead;