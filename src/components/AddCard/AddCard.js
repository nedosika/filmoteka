import React from 'react';
import Card from "@mui/material/Card";
import {CardActionArea, CardActions} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const AddCard = () => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    +
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default AddCard;