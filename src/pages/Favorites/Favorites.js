import React from "react";
import {useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Layout, {LayoutTitles} from "../../Layout";
import useActions from "../../hooks/useActions";
import FilmCard from "../../components/FilmCard/FilmCard";

const Favorites = () => {
    const navigate = useNavigate();
    const mapState = (state) => ({
        films: state.favorites,
        isLoading: state.loading.isLoading,
        isAuth: state.auth.isAuth
    })
    const {
        films,
        isAuth
    } = useSelector(mapState);
    const {getFavorites} = useActions();

    React.useEffect(() => {
        getFavorites();
    }, []);

    const handleRemove = (film) => () => {
        navigate(`remove/${film.id}`)
    }

    return (
        <Layout title={LayoutTitles.FAVORITES}>
            <Box sx={{width: '100%'}}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {films?.map((film) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                            <FilmCard
                                film={film}
                                actionsButtons={[
                                    isAuth &&
                                    <IconButton onClick={handleRemove(film)}>
                                        <DeleteOutlineIcon/>
                                    </IconButton>
                                ]}
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>
            <Outlet/>
        </Layout>);
}

export default Favorites;