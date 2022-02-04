import React from "react";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Film from "./Film";
import Layout from "../../Layout";
import Loader from "../../components/Loader";
import useActions from "../../hooks/useActions";

const Favorites = () => {
    const mapState = (state) => ({
        films: state.favorites.data,
        isLoading: state.favorites.isLoading,
        isAuth: state.auth.isAuth
    })
    const {
        films,
        isLoading,
        isAuth
    } = useSelector(mapState);
    const {getFavorites} = useActions();

    React.useEffect(() => {
        getFavorites();
    }, []);

    return (
        <Layout title={`Films`}>
            <Box sx={{width: '100%'}}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {
                        isLoading && <Loader/>
                    }
                    {
                        films?.map((film) =>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                                <Film film={film}/>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
            <Outlet/>
        </Layout>);
}

export default Favorites;