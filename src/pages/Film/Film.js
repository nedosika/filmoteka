import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

import {Stack} from "@mui/material";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Typography from '@mui/material/Typography';
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from '@mui/icons-material/Favorite';

import Layout from "../../Layout";
import ActionCreators from "../../actions";
import {useRouter} from "../../hooks/useRouter";
import useSmartAction from "../../hooks/useSmartAction";
import useActions from "../../hooks/useActions";
import {DIALOG_TYPES} from "../../components/DialogManager/Dialogs";


const FilmSkeleton = () =>
    <Stack spacing={1}>
        <Skeleton variant="text"/>
        <Skeleton variant="text"/>
        <Skeleton variant="rectangular" width={400} height={200}/>
        <Skeleton variant="text"/>
        <Skeleton variant="text"/>
        <Skeleton variant="circular" width={40} height={40}/>
    </Stack>

const Film = () => {
    const {params} = useRouter();

    const mapState = (state) => ({
        film: state.films.current,
        isLoading: state.loading.isLoading
    });
    const {film} = useSelector(mapState)
    const {openDialog, addToFavorites} = useActions();
    const getFilm = useSmartAction(ActionCreators.getFilm);

    const handleOpenDialog = (dialog, id) => () => {
        openDialog(dialog, {id})
    }

    const handleAddToFavorites = (film) => () => {
        addToFavorites(film);
    }

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
                                <IconButton onClick={handleAddToFavorites(film)}>
                                    <FavoriteIcon/>
                                </IconButton>
                                <IconButton onClick={handleOpenDialog(DIALOG_TYPES.EDIT_FILM, film.id)}>
                                    <EditIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                        :
                        <FilmSkeleton/>
                }
            </Container>
        </Layout>
    );
};

export default Film;