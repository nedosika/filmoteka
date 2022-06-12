import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { voteFilm as voteFilmAction } from '@Actions/filmsActions';
import useDialog from '@Components/DialogManager/useDialog';
import { DIALOG_TYPES } from '@Components/Dialogs';
import useSmartActionRTK from '@Hooks/useSmartActionRTK';
import { favoritesAPI } from '@Reducers/favoritesReducer';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const FilmCard = ({ film }) => {
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const mapState = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.user?.id,
  });
  const { isAuth, userId } = useSelector(mapState);
  const { action: voteFilm } = useSmartActionRTK(voteFilmAction);
  const [isFavorite, setIsFavorite] = useState(false);

  const [addToFavorites, {}] = favoritesAPI.useAddToFavoritesMutation();
  const [removeFromFavorites, {}] = favoritesAPI.useRemoveFromFavoritesMutation();

  useEffect(() => setIsFavorite(film.isFavorite), [film]);

  const handleSwitchFavorite = () => {
    if (film?.isFavorite) {
      removeFromFavorites({ userId, filmId: film.id });
    } else {
      addToFavorites({ userId, film });
    }
    setIsFavorite((prevState) => !prevState);
  };

  const handleOpenDialog = () => {
    openDialog(DIALOG_TYPES.EDIT_FILM, { id: film.id });
  };

  const handleNavigate = () => {
    navigate(`/film/${film.id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardActionArea onClick={handleNavigate}>
        <CardMedia component="img" height="140" image={film?.img} alt={`film-image-${film?.name}`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" data-testid="title">
            {film?.name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div" data-testid="extra-information">
            {film?.year}, {film?.genre}
          </Typography>
          <Typography variant="body2" color="text.secondary" data-testid="description">
            {film?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Rating
          value={film?.rating || 0}
          size="large"
          precision={0.5}
          onChange={(event, value) => voteFilm({ id: film.id, value })}
        />
        {isAuth && (
          <Box>
            <IconButton onClick={handleSwitchFavorite}>
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton onClick={handleOpenDialog}>
              <EditIcon />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default FilmCard;
