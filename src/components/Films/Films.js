import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Layout, { LayoutTitles } from '../../Layout';
import AddFilmButton from '../../pages/Films/AddFilmButton';
import FilmCard from '../FilmCard';

const Films = ({
  films,
  isLoading,
  pages,
  page,
  onChangePage,
  onChangeSort,
  onOpenDialog,
  onChangePageCount,
  isAuth,
}) => (
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
          <Select name="sort" label="Sort by" onChange={onChangeSort} defaultValue="Name asc">
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
          <Select name="pages" label="Films per page" onChange={onChangePageCount} defaultValue={5}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {films.map((film) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FilmCard film={film} key={film.id} isLoading={isLoading} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} hidden={!isAuth}>
          <AddFilmButton onClick={onOpenDialog} isHidden={false} />
        </Grid>
      </Grid>
      <Pagination
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '15px',
        }}
        count={pages > 1 ? pages : 0}
        hideNextButton={page === pages}
        hidePrevButton={page === 1}
        page={page}
        size="large"
        onChange={onChangePage}
      />
    </Box>
  </Layout>
);

export default Films;
