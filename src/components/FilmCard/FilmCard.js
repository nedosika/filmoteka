import React from 'react';

import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';

const FilmCard = ({ film, actionsButtons, onNavigate }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardActionArea onClick={onNavigate}>
        <CardMedia component="img" height="140" image={film.img} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {film.name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {film.year}, {film.genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {film.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Rating readOnly value={film.rating} size="large" />
        {actionsButtons}
      </CardActions>
    </Card>
  );
};

export default FilmCard;
