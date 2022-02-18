import React from "react";
import {useSelector} from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import useActions from "../../hooks/useActions";
import Layout, {LayoutTitles} from "../../Layout";
import FilmCard from "../../components/FilmCard/FilmCard";
import {DIALOG_TYPES} from "../../components/DialogManager/Dialogs";

const Favorites = () => {
    const mapState = (state) => ({
        films: state.favorites,
        isLoading: state.loading.isLoading,
        isAuth: state.auth.isAuth
    })
    const {
        films,
        isAuth
    } = useSelector(mapState);
    const {getFavorites, openDialog} = useActions();

    React.useEffect(() => {
        getFavorites();
    }, []);


    const handleOpenDialog = (dialog, id) => () => {
        openDialog(dialog, {id})
    }

    return (
        <Layout title={LayoutTitles.FAVORITES}>
            <Box sx={{width: '100%'}}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {films?.map((film) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                            <FilmCard
                                film={film}
                                onEdit={handleOpenDialog(DIALOG_TYPES.EDIT_FILM, film.id)}
                                actionsButtons={
                                    isAuth &&
                                    <Box>
                                    <IconButton onClick={handleOpenDialog(DIALOG_TYPES.DELETE_FILM_FROM_FAV, film.id)}>
                                        <DeleteOutlineIcon/>
                                    </IconButton>
                                    </Box>
                                }
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Layout>);
}

export default Favorites;