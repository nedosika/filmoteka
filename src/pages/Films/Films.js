import React from "react";

import Layout from "../../Layout";
import {useSelector} from "react-redux";
import {SELECTORS} from "../../reducers";
import useActions from "../../hooks/useActions";
import Loader from "../../components/Loader";
import Film from "../../components/Film/Film";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Films = () => {
    const {films, isLoading, error} = useSelector(SELECTORS.films);
    const {getFilms} = useActions();

    React.useEffect(() => {
        getFilms()
    }, []);

    return (
        <Layout title={`Films`}>
            <Box sx={{width: '100%'}}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {
                        isLoading
                            ? <Loader/>
                            : films.map((film) =>
                                <Grid item  xs={6} sm={6} md={4} lg={3} xl={2} key={film.id}>
                                    <Film film={film}/>
                                </Grid>
                            )
                    }
                </Grid>
            </Box>

        </Layout>);
}

export default Films;