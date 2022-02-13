import React from 'react';
import {useSearchParams} from "react-router-dom";

import Layout from "../../Layout";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FilmCard from "../Films/FilmCard";
import {useSelector} from "react-redux";
import useActions from "../../hooks/useActions";
import TextField from "@mui/material/TextField";

const Search = () => {
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries([...searchParams]);

    const mapState = (state) => ({
        films: state.films.data,
        isLoading: state.loading.isLoading
    })
    const {films} = useSelector(mapState);
    const {getFilms} = useActions();

    React.useEffect(() => {
        getFilms(params);
    }, [searchParams]);

    return (
        <Layout title="Search">
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                {/*<TextField label="Search" variant="outlined"/>*/}
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {
                        films.map((film) =>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                                <FilmCard film={film}/>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
        </Layout>
    );
};

export default Search;