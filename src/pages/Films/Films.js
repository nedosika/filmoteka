import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Layout, { LayoutTitles } from '../../Layout';
import { FILMS_PER_PAGE, getFilms as getFilmsAction } from '../../actions';
import useDialog from '../../components/DialogManager/useDialog';
import { DIALOG_TYPES } from '../../components/Dialogs';
import FilmCard from '../../components/FilmCard/FilmCard';
import useActions from '../../hooks/useActions';
import useSmartAction from '../../hooks/useSmartAction';
import AddFilmButton from './AddFilmButton';

const generateSkeletonsArray = (count) => {
  const skeletons = [];
  for (let i = 0; i < count; i++) skeletons.push(i);

  return skeletons;
};

const Films = () => {
  const [state, setState] = useState({
    filter: '',
    sort: 'name',
    order: 'ASC',
  });
  const navigate = useNavigate();
  const mapState = (state) => ({
    films: state.films.allIds.map((id) => ({
      id,
      ...state.films.byId[id],
    })),
    page: state.films.page,
    pages: state.films.pages,
    isAuth: state.auth.isAuth,
    isLoading: state.loading.isLoading,
  });
  const { films, page, pages, isAuth, isLoading } = useSelector(mapState);
  const [skeletons, setSkeletons] = useState(generateSkeletonsArray(FILMS_PER_PAGE));

  const { addToFavorites } = useActions();
  const getFilms = useSmartAction(getFilmsAction);
  const { openDialog } = useDialog();

  const handleChangePage = (event, page = 1) => {
    getFilms({ page });
  };

  const handleAddToFavorites = (film) => () => {
    addToFavorites(film);
  };

  const handleOpenDialog = (dialog, id) => () => {
    openDialog(dialog, { id });
  };

  const handleNavigate = (film) => () => {
    navigate(`/film/${film.id}`);
  };

  const handleChange = ({ target: { name, value } }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filteredFilms = films.sort((a, b) => {
    if (state.order === 'ASC') return a[state.sort] > b[state.sort] ? 1 : -1;
    if (state.order === 'DESC') return a[state.sort] < b[state.sort] ? 1 : -1;
  });

  useEffect(handleChangePage, []);

  useCallback(() => {
    setSkeletons(generateSkeletonsArray(FILMS_PER_PAGE));
  }, [page]);

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
            <Select name="sort" label="Sort by" onChange={handleChange} defaultValue="name">
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="year">Year</MenuItem>
              <MenuItem value="genre">Genre</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Order by</InputLabel>
            <Select name="order" label="Order by" onChange={handleChange} defaultValue="ASC">
              <MenuItem value="ASC">ASC</MenuItem>
              <MenuItem value="DESC">DESC</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {isLoading
            ? skeletons.map((element) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={element}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Skeleton variant="rectangular" width="100%" height={140} />
                    <Skeleton height={30} width="70%" sx={{ margin: '15px 15px 0 15px' }} />
                    <Skeleton height={10} width="50%" sx={{ margin: '15px' }} />
                    <Skeleton height={10} width="50%" sx={{ margin: '0 15px' }} />
                    <Skeleton height={30} sx={{ margin: '35px 10px 13px 10px' }} />
                  </Card>
                </Grid>
              ))
            : filteredFilms.map((film) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                  <FilmCard
                    film={film}
                    onNavigate={handleNavigate(film)}
                    actionsButtons={
                      isAuth && (
                        <Box>
                          <IconButton onClick={handleAddToFavorites(film)}>
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

export default Films;
