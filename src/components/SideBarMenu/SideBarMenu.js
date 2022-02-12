import React from 'react';
import {useSelector} from "react-redux";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {Assignment} from "@mui/icons-material";
import Drawer from "@mui/material/Drawer/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";

import {useRouter} from "../../hooks/useRouter";
import useActions from "../../hooks/useActions";

const SideBarMenu = ({isOpen, onClose}) => {
    const {navigate, location} = useRouter();
    const mapState = (state) => ({
        isAuth: state.auth.isAuth,
        isLoading: state.loading.isLoading,
        error: state.loading.error,
        notice: state.notice,
        searchedFilms: state.search.results
    });
    const {isAuth} = useSelector(mapState);
    const {signOut} = useActions();

    const handleSignOut = () => {
        signOut();
        onClose();
    }

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={onClose}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: 12
            }}>
                <IconButton onClick={onClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <Box sx={{width: 240}}>
                <List>
                    <ListItem
                        button
                        selected={location.pathname.split('/')[1] === 'home'}
                        onClick={() => navigate('/')}
                    >
                        <ListItemIcon>
                            <Assignment/>
                        </ListItemIcon>
                        <ListItemText primary='Home'/>
                    </ListItem>
                    <ListItem
                        button
                        selected={location.pathname.split('/')[1] === 'films'}
                        onClick={() => navigate('/films')}
                    >
                        <ListItemIcon>
                            <Assignment/>
                        </ListItemIcon>
                        <ListItemText primary='Films'/>
                    </ListItem>
                    <ListItem
                        button
                        selected={location.pathname.split('/')[1] === 'search'}
                        onClick={() => navigate('/search')}
                    >
                        <ListItemIcon>
                            <Assignment/>
                        </ListItemIcon>
                        <ListItemText primary='Search'/>
                    </ListItem>
                    {
                        isAuth &&
                        <ListItem
                            button
                            selected={location.pathname.split('/')[1] === 'fav'}
                            onClick={() => navigate('/fav')}
                        >
                            <ListItemIcon>
                                <Assignment/>
                            </ListItemIcon>
                            <ListItemText primary='Favorites'/>
                        </ListItem>
                    }
                    <Divider/>
                    {isAuth
                        ? (
                            <ListItem
                                button
                                onClick={handleSignOut}
                            >
                                <ListItemIcon>
                                    <Assignment/>
                                </ListItemIcon>
                                <ListItemText primary='Logout'/>
                            </ListItem>
                        )
                        : (
                            <ListItem
                                button
                                onClick={() => navigate("/signin")}
                            >
                                <ListItemIcon>
                                    <Assignment/>
                                </ListItemIcon>
                                <ListItemText primary='Login'/>
                            </ListItem>
                        )
                    }
                </List>
            </Box>
        </Drawer>
    );
};

export default SideBarMenu;