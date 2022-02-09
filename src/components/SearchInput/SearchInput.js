import React from 'react';
import lodash from "lodash";

import InputBase from '@mui/material/InputBase';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from "@mui/material/Autocomplete";

import useDebounce from "../../hooks/useDebounce";
import useActions from "../../hooks/useActions";
import {useSelector} from "react-redux";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
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
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

const SearchInput = () => {
    const [state, setState] = React.useState('');
    const {searchFilms} = useActions();
    const films = useSelector(state => state.search);

    const debouncedSearchTerm = useDebounce(state, 500);

    React.useEffect(
        () => {
            // if (debouncedSearchTerm) {
                searchFilms(debouncedSearchTerm)
//            }
        },
        [debouncedSearchTerm]
    );

    const handleChange = ({target: {value}}) => {
        setState(value);
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <Autocomplete
                freeSolo
                options={films}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <StyledInputBase
                    ref={params.InputProps.ref}
                    {...lodash.omit(params, ['InputLabelProps', 'InputProps'])}
                    onChange={handleChange}
                    placeholder="Search…"
                />
                }
            />
        </Search>
    );
};

export default SearchInput;