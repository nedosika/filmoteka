import React from "react";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Film from "./Film";
import Layout from "../../Layout";
import AddFilmButton from "./AddFilmButton";
import FilmActionCreator from "../../actions/filmsActions";
import useSmartActions from "../../hooks/useSmartActions";

const Films = () => {
    const mapState = (state) => ({
        films: state.films,
        isAuth: state.auth.isAuth,
        isLoading: state.loading.isLoading
    })
    const {
        films,
        isAuth,
        isLoading
    } = useSelector(mapState);

    const {getFilms} = useSmartActions();

    React.useEffect(() => {
        getFilms();
    }, []);

    return (
        <Layout title={`Films`}>
            <Box sx={{width: '100%'}}>

                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {
                        films.map((film) =>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                                <Film film={film}/>
                            </Grid>
                        )
                    }
                    {
                        isAuth && !isLoading &&
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <AddFilmButton/>
                        </Grid>
                    }
                </Grid>
            </Box>
            <Outlet/>
        </Layout>);
}

export default Films;