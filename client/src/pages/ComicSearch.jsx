import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField, Toolbar } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import uiConfigs from '../configs/ui.configs';
import comicsApi from '../apis/modules/comic.api';
import SearchGrid from '../components/SearchGrid';

let timer;
const timeout = 500;

const ComicSearch = () => {
  const [query, setQuery] = useState('');
  const [onSearch, setOnSearch] = useState(false);
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(
    async () => {
      setOnSearch(true);

      const { response, err } = await comicsApi.search({
        q: query,
        page
      });

      setOnSearch(false);

      if (err) toast.error(err.message);
      if (response) {
        if (response.status === 404) return;
        if (page > 1) setComics(m => [...m, ...response.comics]);
        else setComics([...response.comics]);
      }
    },
    [query, page]
  );

  useEffect(() => {
    if (query.trim().length === 0) {
      setComics([]);
      setPage(1);
    } else search();
  }, [search, query, page]);

  useEffect(() => {
    setComics([]);
    setPage(1);
  }, []);


  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <TextField
            color='success'
            placeholder='Search KComics'
            sx={{ width: '100%' }}
            autoFocus
            onChange={onQueryChange}
          />

          <SearchGrid comics={comics}/>

          {comics.length > 0 && (
            <LoadingButton
              loading={onSearch}
              onClick={() => setPage(page + 1)}
            >
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default ComicSearch;