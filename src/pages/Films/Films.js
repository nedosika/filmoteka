import React from "react";
import {useSelector} from "react-redux";

import Layout from "../../Layout";
import {SELECTORS} from "../../reducers";
import Loader from "../../components/Loader";
import Film from "../../components/Film/Film";
import AddCard from "../../components/AddCard";
import useActions from "../../hooks/useActions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Films = () => {
    const {films, isLoading, error} = useSelector(SELECTORS.films);
    const {isAuth} = useSelector(SELECTORS.auth);
    const {getFilms} = useActions();

    React.useEffect(() => {
        getFilms();
    }, []);

    return (
        <Layout title={`Films`}>
            <Box sx={{width: '100%'}}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {
                        isLoading && <Loader/>
                    }
                    {
                        films.map((film) =>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                                <Film film={film}/>
                            </Grid>
                        )
                    }
                    {
                        isAuth && (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <AddCard/>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>

        </Layout>);
}

export default Films;