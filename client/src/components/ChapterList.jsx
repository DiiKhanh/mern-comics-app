import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { routesGen } from '../routes/routes';

const chaptersPerRange = 50; // Số chương trong mỗi khoảng

const ChapterList = ({ chapters, comicId }) => {
  const [currentRange, setCurrentRange] = useState(0);
  const chaptersReversed = [...chapters].reverse();
  const handleRangeChange = (range) => {
    setCurrentRange(range);
  };

  const hasChapterZero = chaptersReversed[0]?.name.includes('0');
  const totalChapters = chaptersReversed.length;

  const renderChapters = () => {
    let startChapter = currentRange * chaptersPerRange + (currentRange > 0 ? 1 : 0)
    - (hasChapterZero ? 0 : 1)
    ;
    let endChapter = Math.min((hasChapterZero ? startChapter : startChapter+1) + chaptersPerRange - (currentRange > 0 ? 1 : 0)
    - (hasChapterZero ? 0 : 1)
    , (hasChapterZero ? totalChapters - 1 : totalChapters));
    if (startChapter === -1) startChapter = 0;
    if (endChapter === totalChapters && hasChapterZero === false) endChapter = totalChapters-1;


    const chapterElements = [];
    for (let i = startChapter; i <= endChapter; i++) {
      chapterElements.push(<Grid item xs={2} sm={4} md={3} key={i}
      >
        <Link to={routesGen.comicChapter(comicId, chaptersReversed[i]?.id)} style={{
          textDecoration:'none', color:'inherit'
        }}>
          <Box sx={{ border: '1px solid #55E6C1', borderRadius: '.15rem', padding: '0.4rem 0.8rem',
            '&:hover':{
              backgroundColor: (theme) => theme.palette.primary.main
            },
            transition: 'all .2s ease',
            cursor: 'pointer'
          }} >
            {
              chaptersReversed[i]?.name
            }
          </Box>
        </Link>
      </Grid>);
    }

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {chapterElements}
          </Grid>
        </Box>
      </>
    );
  };


  const isValidRange = (range) => {
    return range >= 0 && range < Math.ceil((hasChapterZero ? totalChapters - 1 : totalChapters) / chaptersPerRange);
  };

  const renderRangeButtons = () => {
    const rangeButtons = [];
    for (let index = 0; index < Math.ceil((hasChapterZero ? totalChapters - 1 : totalChapters) / chaptersPerRange); index++) {
      const rangeStart = index * chaptersPerRange + (index > 0 ? 1 : 0);
      const rangeEnd = Math.min((index + 1) * chaptersPerRange, (hasChapterZero ? totalChapters - 1 : totalChapters));

      rangeButtons.push(
        <Button
          key={index}
          onClick={() => handleRangeChange(index)}
          disabled={currentRange === index || !isValidRange(index)}
          variant='contained'
          sx={{ padding: '0.125rem 0.5rem' }}
        >
          {rangeStart} - {rangeEnd}
        </Button>
      );
    }
    return (
      <Box sx={{ marginY: '2rem', display: 'flex', alignItems:'center', gap: '10px', flexWrap:'wrap' }}>
        {rangeButtons}
      </Box>
    );
  };

  return (
    <div>
      <div>{renderRangeButtons()}</div>
      <div>{renderChapters()}</div>
    </div>
  );
};

export default ChapterList;