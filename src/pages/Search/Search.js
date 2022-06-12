import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import searchActions from '@Actions/searchActions';
import useDialog from '@Components/DialogManager/useDialog';
import { DIALOG_TYPES } from '@Components/Dialogs';
import FilmCard from '@Components/FilmCard/FilmCard';
import useSmartAction from '@Hooks/useSmartAction';
import { favoritesAPI } from '@Reducers/favoritesReducer';
import { searchSelector } from '@Reducers/searchReducer';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Layout, { LayoutTitles } from 'Layout';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const mapState = (state) => ({
    isAuth: state.auth.isAuth,
  });
  const { isAuth } = useSelector(mapState);
  const films = useSelector(searchSelector.selectAll);
  const [addToFavorites, {}] = favoritesAPI.useAddToFavoritesMutation();
  const searchFilms = useSmartAction(searchActions.searchFilms);

  const { openDialog } = useDialog();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState({
    field: 'name',
    order: 'ASC',
  });

  const filteredFilms = films
    .filter((film) => film.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sort.order === 'ASC') return a[sort.field] > b[sort.field] ? 1 : -1;
      if (sort.order === 'DESC') return a[sort.field] < b[sort.field] ? 1 : -1;
    });

  useEffect(() => {
    searchFilms(params.query);
  }, [searchParams]);

  const handleChangeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const handleChangeSort = (event) => {
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

  const handleOpenDialog = (dialog, id) => () => {
    openDialog(dialog, { id });
  };

  const handleNavigate = (film) => () => {
    navigate(`/film/${film.id}`);
  };

  return (
    <Layout title={LayoutTitles.SEARCH}>
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
          <TextField name="filter" label="Filter" variant="outlined" value={filter} onChange={handleChangeFilter} />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort by</InputLabel>
            <Select name="sort" label="Sort by" onChange={handleChangeSort} defaultValue="Name asc">
              <MenuItem value="Name asc">Name asc</MenuItem>
              <MenuItem value="Name desc">Name desc</MenuItem>
              <MenuItem value="Year asc">Year asc</MenuItem>
              <MenuItem value="Year desc">Year desc</MenuItem>
              <MenuItem value="Genre asc">Genre asc</MenuItem>
              <MenuItem value="Genre desc">Genre desc</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {filteredFilms.map((film) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
              <FilmCard
                film={film}
                onNavigate={handleNavigate(film)}
                actionsButtons={
                  isAuth && (
                    <Box>
                      <IconButton onClick={() => addToFavorites(film)}>
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton onClick={handleOpenDialog(DIALOG_TYPES.EDIT_FILM, film.id)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  )
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Search;
