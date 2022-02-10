import React from 'react';
import {useSearchParams} from "react-router-dom";

import Layout from "../../Layout";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Film from "../Films/Film";
import AddFilmButton from "../Films/AddFilmButton";
import Pagination from "@mui/material/Pagination";
import {useSelector} from "react-redux";
import useActions from "../../hooks/useActions";

const Search = () => {
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries([...searchParams]);

    const mapState = (state) => ({
        films: state.films,
        isLoading: state.loading.isLoading
    })
    const {films} = useSelector(mapState);
    const {getFilmsByQuery} = useActions();

    React.useEffect(() => {
        getFilmsByQuery(params.query);
    }, [params.query]);

    return (
        <Layout title="Search">
            <Box sx={{width: '100%'}}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {
                        films.map((film) =>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                                <Film film={film}/>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
        </Layout>
    );
};

export default Search;