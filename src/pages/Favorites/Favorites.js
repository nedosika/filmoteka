import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Layout, { LayoutTitles } from '../../Layout';
import FilmCard from '../../components/FilmCard/FilmCard';
import { favoritesAPI } from '../../reducers/favoritesReducer';

const Favorites = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: response } = favoritesAPI.useFetchAllFavoritesQuery(user.id);
  const films = response?.data;

  return (
    <Layout title={LayoutTitles.FAVORITES}>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {films?.map((film) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
              <FilmCard film={{ ...film, isFavorite: true }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Favorites;
