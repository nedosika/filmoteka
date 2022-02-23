import React from 'react';
import {useSelector} from "react-redux";
import {createSearchParams} from "react-router-dom";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {AccountCircle} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

import Search from "../Search";
import {useRouter} from "../../hooks/useRouter";
import useActions from "../../hooks/useActions";
import {DIALOG_TYPES} from "../DialogManager/Dialogs";
import useSmartAction from "../../hooks/useSmartAction";
import searchActions from "../../actions/searchActions";
import useDialog from "../DialogManager/useDialog";

const Header = ({title, onOpenMenuBar}) => {
    const {navigate} = useRouter();
    const mapState = (state) => ({
        isAuth: state.auth.isAuth,
        isLoading: state.loading.isLoading,
        options: state.search.options
    });
    const {isAuth, isLoading, options} = useSelector(mapState);
    const {openDialog} = useDialog();
    const getOptions = useSmartAction(searchActions.getSearchOptions);

    const handleSearch = (query) => {
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({
                query
            })}`
        });
    }

    const handleSubmit = (id) => {
        navigate(`/film/${id}`);
    }

    const handleAddFilm = () => {
        openDialog(DIALOG_TYPES.ADD_FILM)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{mr: 2}}
                        onClick={onOpenMenuBar}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    {
                        isAuth &&
                        <Button
                            color="inherit"
                            variant='outlined'
                            sx={{mr: 2}}
                            onClick={handleAddFilm}
                        >
                            Add film
                        </Button>
                    }
                    <Search
                        search={getOptions}
                        options={options}
                        onSearch={handleSearch}
                        onSubmit={handleSubmit}
                    />
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                        >
                            {
                                isLoading
                                    ? <CircularProgress color="inherit" size={24}/>
                                    : isAuth && <AccountCircle/>
                            }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;