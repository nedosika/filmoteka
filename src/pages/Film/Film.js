import React, {useEffect, useState} from 'react';
import Layout from "../../Layout";
import {useRouter} from "../../hooks/useRouter";
import {useSelector} from "react-redux";
import useActions from "../../hooks/useActions";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import {Stack} from "@mui/material";

const Film = () => {
    const {getFilm} = useActions();
    const mapState = (state) => ({
        film: state.films.currentFilm,
        isLoading: state.loading.isLoading
    });
    const {film} = useSelector(mapState)
    const {params} = useRouter();

    useEffect(() => {
        getFilm(params.id)
    }, [params])

    return (
        <Layout title={film?.name}>
            <Container maxWidth="xs">
                {
                    film
                        ?
                        <Card sx={{maxWidth: 500}}>
                            <CardHeader
                                title={film.name}
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={film.img}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {film.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton>
                                    <FavoriteIcon/>
                                </IconButton>
                                <IconButton>
                                    <ShareIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                        :
                        <Stack spacing={1}>
                            <Skeleton variant="text"/>
                            <Skeleton variant="text"/>
                            <Skeleton variant="rectangular" width={400} height={200}/>
                            <Skeleton variant="text"/>
                            <Skeleton variant="text"/>
                            <Skeleton variant="circular" width={40} height={40}/>
                        </Stack>
                }
            </Container>
        </Layout>
    );
};

export default Film;