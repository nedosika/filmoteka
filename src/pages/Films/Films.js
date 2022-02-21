import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ActionCreators from "../../actions";
import AddFilmButton from "./AddFilmButton";
import useActions from "../../hooks/useActions";
import Layout, {LayoutTitles} from "../../Layout";
import useSmartAction from "../../hooks/useSmartAction";
import FilmCard from "../../components/FilmCard/FilmCard";
import useDialog from "../../components/DialogManager/useDialog";
import {DIALOG_TYPES} from "../../components/DialogManager/Dialogs";

const Films = () => {
    const navigate = useNavigate();
    const mapState = (state) => ({
        films: state.films.films.byId,
        page: state.films.page,
        pages: state.films.pages,
        isAuth: state.auth.isAuth
    });
    const {
        films,
        page,
        pages,
        isAuth
    } = useSelector(mapState);

    const {addToFavorites} = useActions();
    const getFilms = useSmartAction(ActionCreators.getFilms);
    const {openDialog} = useDialog();

    const handleChangePage = (event, page = 1) => {
        getFilms({page});
    }

    const handleAddToFavorites = (film) => () => {
        addToFavorites(film);
    }

    const handleOpenDialog = (dialog, id) => () => {
        openDialog(dialog, {id})
    }

    const handleNavigate = (film) => () => {
        navigate(`/film/${film.id}`);
    }

    useEffect(handleChangePage, []);

    return <Layout title={LayoutTitles.FILMS}>
        <Box sx={{width: '100%'}}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{xs: 1, sm: 2, md: 3}}
            >
                {
                    Object
                        .entries(films)
                        .map(([id, film]) =>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
                                <FilmCard
                                    film={film}
                                    onNavigate={handleNavigate(film)}
                                    actionsButtons={
                                        isAuth &&
                                        <Box>
                                            <IconButton onClick={handleAddToFavorites(film)}>
                                                <FavoriteIcon/>
                                            </IconButton>
                                            <IconButton onClick={handleOpenDialog(DIALOG_TYPES.EDIT_FILM, id)}>
                                                <EditIcon/>
                                            </IconButton>
                                        </Box>
                                    }
                                />
                            </Grid>
                        )
                }
                {
                    isAuth &&
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <AddFilmButton onClick={handleOpenDialog(DIALOG_TYPES.ADD_FILM)}/>
                    </Grid>
                }
            </Grid>
            {
                pages > 1 &&
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '15px'
                }}>
                    <Pagination
                        count={pages}
                        page={page}
                        size="large"
                        onChange={handleChangePage}
                    />
                </Box>
            }
        </Box>
    </Layout>
}

export default Films;