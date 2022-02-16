import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Layout from "../../Layout";
import FilmCard from "../Films/FilmCard";
import useActions from "../../hooks/useActions";

const Search = () => {
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries([...searchParams]);

    const mapState = (state) => ({
        films: state.search.results,
        isLoading: state.loading.isLoading
    })
    const {films} = useSelector(mapState);
    const {searchFilms} = useActions();
    const [state, setState] = useState({
        filter: ''
    });

    useEffect(() => {
        searchFilms(params.query);
    }, [searchParams]);

    const handleChange = ({target: {name, value}}) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <Layout title="Search">
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    <TextField
                        name='filter'
                        label='Filter'
                        variant='outlined'
                        value={state.filter}
                        onChange={handleChange}
                    />
                    <FormControl sx={{minWidth: 120}}>
                        <InputLabel>Sort by</InputLabel>
                        <Select label="Sort by">
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    {
                        films.filter((film) => film.name.toLowerCase().includes(state.filter.toLowerCase())).map((film) =>
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