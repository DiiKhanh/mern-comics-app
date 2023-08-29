import Grid from '@mui/material/Grid';
import ComicItemGrid from './ComicItemGrid';

const SearchGrid = ({ comics }) => {
  return (
    <Grid container spacing={1}>
      {comics.map((comic, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <ComicItemGrid comic={comic} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchGrid;