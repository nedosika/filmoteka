import React from 'react';
import lodash from "lodash";

import InputBase from '@mui/material/InputBase';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from "@mui/material/Autocomplete";

import useDebounce from "../../hooks/useDebounce";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: '10px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    }
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '15ch',
        '&:focus': {
            width: '28ch',
        },
    },
}));

const SearchInput = ({onSubmit, searchFilms, films}) => {
    const [state, setState] = React.useState('');
    const debouncedSearchTerm = useDebounce(state, 500);

    React.useEffect(
        () => {
            if (debouncedSearchTerm)
                searchFilms(debouncedSearchTerm)
        },
        [debouncedSearchTerm]
    );

    const handleInputChange = (event, value) => {
        setState(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        onSubmit(data.get('search'));
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    options={films}
                    onInputChange={handleInputChange}
                    renderInput={(params) => <StyledInputBase
                        ref={params.InputProps.ref}
                        {...lodash.omit(params, ['InputLabelProps', 'InputProps'])}
                        type='search'
                        placeholder="Search…"
                        name='search'
                    />}
                />
            </form>
        </Search>
    );
};

export default SearchInput;