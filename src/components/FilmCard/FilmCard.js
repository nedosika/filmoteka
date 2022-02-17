import React from 'react';

import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Rating from "@mui/material/Rating";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import {CardActionArea, CardActions} from '@mui/material';

const FilmCard = ({film, actionsButtons, onEdit}) => {
    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <CardActionArea onClick={onEdit}>
                <CardMedia
                    component="img"
                    height="140"
                    image={film.img}
                    alt="green iguana"
                />
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
            <CardActions sx={{justifyContent: 'space-between'}}>
                <Rating readOnly value={film.rating} size="large"/>
                <Box>
                    {actionsButtons.map((ActionButton) => ActionButton && React.cloneElement(ActionButton))}
                </Box>
            </CardActions>
        </Card>
    );
}

export default FilmCard;