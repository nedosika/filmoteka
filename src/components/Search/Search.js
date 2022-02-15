import React, {useEffect, useState} from 'react';
import omit from "lodash/omit";

import InputBase from '@mui/material/InputBase';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from "@mui/material/Autocomplete";

import useDebounce from "../../hooks/useDebounce";
import AutocompleteItem from "./AutocompleteItem";

const Container = styled('div')(({theme}) => ({
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

const Search = ({onSubmit, onSearch, search, options}) => {
    const [state, setState] = useState('');
    const debouncedSearchTerm = useDebounce(state, 500);

    useEffect(
        () => {
            if (debouncedSearchTerm)
                search(debouncedSearchTerm)
        },
        [debouncedSearchTerm]
    );

    const handleInputChange = (event, value) => {
        setState(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        onSearch(data.get('search'));
    }

    const handleChange = (event, value) => {
        value && onSubmit(value.id);
    }

    const handleHook = (value) => (event) => {
        event.stopPropagation();
        setState(value);
    }

    return (
        <Container>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    options={options}
                    inputValue={state}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    getOptionLabel={option => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderOption={({key, ...props}) =>
                        <AutocompleteItem
                            {...props}
                            key={key}
                            value={key}
                            onHook={handleHook(key)}
                        />
                    }
                    renderInput={(props) =>
                        <StyledInputBase
                            ref={props.InputProps.ref}
                            {...omit(props, ['InputLabelProps', 'InputProps'])}
                            type='search'
                            placeholder="Search…"
                            name='search'
                        />
                    }
                />
            </form>
        </Container>
    );
};

export default Search;