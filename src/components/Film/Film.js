import * as React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import {CardActionArea, CardActions} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from "@mui/material/Rating";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {useSelector} from "react-redux";
import {SELECTORS} from "../../reducers";

export default function Film({film}) {
    const {isAuth} = useSelector(SELECTORS.auth);
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
                {
                    isAuth && (
                        <>
                            <IconButton>
                                <FavoriteIcon/>
                            </IconButton>
                            <IconButton>
                                <RemoveCircleIcon/>
                            </IconButton>
                        </>
                    )
                }
            </CardActions>
        </Card>
    );
}