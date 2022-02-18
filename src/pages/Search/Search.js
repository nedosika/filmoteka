import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Layout, {LayoutTitles} from "../../Layout";
import FilmCard from "../../components/FilmCard/FilmCard";
import useActions from "../../hooks/useActions";

const Search = () => {
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries([...searchParams]);

    const mapState = (state) => ({
        films: state.search.results,
        isAuth: state.auth.isAuth,
        isLoading: state.loading.isLoading
    })
    const {films, isAuth} = useSelector(mapState);
    const {searchFilms, addToFavorites} = useActions();
    const [state, setState] = useState({
        filter: '',
        sort: 'name',
        order: 'ASC'
    });

    const filteredFilms = films
        .filter((film) =>
            film.name.toLowerCase().includes(state.filter.toLowerCase())
        )
        .sort((a, b) => {
            if (state.order === 'ASC')
                return a[state.sort] > b[state.sort] ? 1 : -1
            if (state.order === 'DESC')
                return a[state.sort] < b[state.sort] ? 1 : -1
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
        <Layout title={LayoutTitles.SEARCH}>
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
                        <Select
                            name='sort'
                            label='Sort by'
                            onChange={handleChange}
                            defaultValue='name'
                        >
                            <MenuItem value='name'>Name</MenuItem>
                            <MenuItem value='year'>Year</MenuItem>
                            <MenuItem value='genre'>Genre</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{minWidth: 120}}>
                        <InputLabel>Order by</InputLabel>
                        <Select
                            name='order'
                            label='Order by'
                            onChange={handleChange}
                            defaultValue='ASC'
                        >
                            <MenuItem value='ASC'>ASC</MenuItem>
                            <MenuItem value='DESC'>DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{xs: 1, sm: 2, md: 3}}
                >
                    {
                        filteredFilms.map((film) =>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={film.id}>
                                <FilmCard
                                    film={film}
                                    actionsButtons={[
                                        isAuth &&
                                        <IconButton onClick={() => addToFavorites(film)}>
                                            <FavoriteIcon/>
                                        </IconButton>
                                    ]}
                                />
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
        </Layout>
    );
};

export default Search;