import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Layout, { LayoutTitles } from '../../Layout';
import filmsActions, { FILMS_PER_PAGE } from '../../actions/filmsActions';
import useDialog from '../../components/DialogManager/useDialog';
import { DIALOG_TYPES } from '../../components/Dialogs';
import FilmCard from '../../components/FilmCard/FilmCard';
import useSmartActionRTK from '../../hooks/useSmartActionRTK';
import { SMART_ACTION_OPTIONS } from '../../hooks/useSmartActionRTK';
import { filmsSelectors } from '../../reducers/filmsReducer';
import { queriesSelector } from '../../reducers/queriesReducer';
import AddFilmButton from './AddFilmButton';
import FilmSkeleton from './FilmSkeleton';

const generateSkeletonsArray = (count) => {
  const skeletons = [];
  for (let i = 0; i < count; i++) skeletons.push(i);

  return skeletons;
};

const FilmsPage = () => {
  const [filmsPerPage, setFilmsPerPage] = useState(FILMS_PER_PAGE);
  const [sort, setSort] = useState({
    field: 'name',
    order: 'ASC',
  });
  const mapState = (state) => ({
    page: state.films.page,
    pages: state.films.pages,
    films: filmsSelectors.selectAll(state),
    isAuth: state.auth.isAuth,
  });
  const { page, pages, films, isAuth } = useSelector(mapState);

  const { action: getFilms, isLoading } = useSmartActionRTK(filmsActions.getFilms);

  const { openDialog } = useDialog();

  const handleChangePage = (event, page = 1) => {
    getFilms({ page, field: sort.field, order: sort.order, limit: filmsPerPage });
  };

  const handleOpenDialog = (dialog, id) => () => {
    openDialog(dialog, { id });
  };

  const handleChange = (event) => {
    switch (event.target.value) {
      case 'Name asc':
        setSort({ field: 'name', order: 'ASC' });
        break;
      case 'Name desc':
        setSort({ field: 'name', order: 'DESC' });
        break;
      case 'Year asc':
        setSort({ field: 'year', order: 'ASC' });
        break;
      case 'Year desc':
        setSort({ field: 'year', order: 'DESC' });
        break;
      case 'Genre asc':
        setSort({ field: 'genre', order: 'ASC' });
        break;
      case 'Genre desc':
        setSort({ field: 'genre', order: 'DESC' });
        break;
    }
  };

  useEffect(handleChangePage, [sort, filmsPerPage]);

  return (
    <Layout title={LayoutTitles.FILMS}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort by</InputLabel>
            <Select name="sort" label="Sort by" onChange={handleChange} defaultValue="Name asc">
              <MenuItem value="Name asc">Name asc</MenuItem>
              <MenuItem value="Name desc">Name desc</MenuItem>
              <MenuItem value="Year asc">Year asc</MenuItem>
              <MenuItem value="Year desc">Year desc</MenuItem>
              <MenuItem value="Genre asc">Genre asc</MenuItem>
              <MenuItem value="Genre desc">Genre desc</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Films per page</InputLabel>
            <Select
              name="pages"
              label="Films per page"
              onChange={(event) => setFilmsPerPage(event.target.value)}
              defaultValue={5}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {isLoading
            ? generateSkeletonsArray(filmsPerPage).map((item, key) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={key}>
                  <FilmSkeleton />
                </Grid>
              ))
            : films.map((film) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id} name="film">
                  <FilmCard film={film} />
                </Grid>
              ))}
          {isAuth && (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <AddFilmButton onClick={handleOpenDialog(DIALOG_TYPES.ADD_FILM)} />
            </Grid>
          )}
        </Grid>
        {pages > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15px',
            }}
          >
            <Pagination count={pages} page={page} size="large" onChange={handleChangePage} />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default FilmsPage;
