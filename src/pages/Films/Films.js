import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Film from "./Film";
import Layout from "../../Layout";
import AddFilmButton from "./AddFilmButton";
import useActions from "../../hooks/useActions";
import Pagination from "@mui/material/Pagination";

const Films = () => {
    const mapState = (state) => ({
        films: state.films.data,
        page: state.films.page,
        limit: state.films.limit,
        size: state.films.size,
        isAuth: state.auth.isAuth,
        isLoading: state.loading.isLoading
    })
    const {
        films,
        page,
        limit,
        size,
        isAuth,
        isLoading
    } = useSelector(mapState);

    const {getFilms} = useActions();
    const pages = Math.round(size / limit);

    const handleChangePage = (event, page) => {
        getFilms({page, limit});
    }

    React.useEffect(() => {
        getFilms({page: 1, limit: 3});
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
                {
                    !isLoading &&
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '15px'
                    }}>
                        <Pagination count={pages} page={page * 1} size="large" onChange={handleChangePage}/>
                    </Box>
                }

            </Box>
            <Outlet/>
        </Layout>);
}

export default Films;