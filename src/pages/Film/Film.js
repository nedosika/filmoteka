import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import filmsActions from '@Actions/filmsActions';
import useDialog from '@Components/DialogManager/useDialog';
import { DIALOG_TYPES } from '@Components/Dialogs';
import { useRouter } from '@Hooks/useRouter';
import useSmartActionRTK from '@Hooks/useSmartActionRTK';
import { favoritesAPI } from '@Reducers/favoritesReducer';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Layout from 'Layout';

const FilmSkeleton = () => (
  <Stack spacing={1}>
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="rectangular" width={400} height={200} />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="circular" width={40} height={40} />
  </Stack>
);

const Film = () => {
  const { params } = useRouter();
  const mapState = (state) => ({
    film: state.films.current,
    isAuth: state.auth.isAuth,
  });
  const { film, isAuth } = useSelector(mapState);
  const [addToFavorites, {}] = favoritesAPI.useAddToFavoritesMutation();
  const { action: getFilm, isLoading } = useSmartActionRTK(filmsActions.getFilm);
  const { openDialog } = useDialog();

  const handleOpenDialog = (dialog, id) => () => {
    openDialog(dialog, { id });
  };

  const handleAddToFavorites = (film) => () => {
    addToFavorites(film);
  };

  useEffect(() => {
    getFilm(params.id);
  }, []);

  return (
    <Layout title={film?.name}>
      <Container maxWidth="xs">
        {!isLoading ? (
          <Card sx={{ maxWidth: 500 }}>
            <CardHeader title={film.name} subheader={film.date} />
            <CardMedia component="img" height="194" image={film.img} alt="Paella dish" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {film.description}
              </Typography>
            </CardContent>
            {isAuth && (
              <CardActions disableSpacing>
                <IconButton onClick={handleAddToFavorites(film)}>
                  <FavoriteIcon />
                </IconButton>
                <IconButton onClick={handleOpenDialog(DIALOG_TYPES.EDIT_FILM, film.id)}>
                  <EditIcon />
                </IconButton>
              </CardActions>
            )}
          </Card>
        ) : (
          <FilmSkeleton />
        )}
      </Container>
    </Layout>
  );
};

export default Film;
