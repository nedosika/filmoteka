import * as React from 'react';
import {useNavigate} from "react-router-dom";

import Card from '@mui/material/Card';
import Rating from "@mui/material/Rating";
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import {CardActionArea, CardActions} from '@mui/material';

export default function Film({film}) {
    return (
        <Card>
            <CardActionArea>
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
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Rating readOnly value={film.rating} size="large"/>
            </CardActions>
        </Card>
    );
}