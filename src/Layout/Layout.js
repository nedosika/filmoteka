import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {Assignment} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "@mui/material/Drawer/Drawer";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";

const Layout = ({title, children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpenMenuBar, setIsOpenMenuBar] = useState(false);

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{mr: 2}}
                            onClick={() => setIsOpenMenuBar(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {title}
                        </Typography>
                        <Box sx={{display: {xs: 'flex', md: 'flex'}}}>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor="left"
                open={isOpenMenuBar}
                onClose={() => setIsOpenMenuBar(false)}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 12
                }}>
                    <IconButton onClick={() => setIsOpenMenuBar(false)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <Box sx={{width: 240}}>
                    <List>
                        <ListItem
                            button
                            selected={location.pathname.split('/')[1] === 'words'}
                            onClick={() => navigate('/words')}
                        >
                            <ListItemIcon>
                                <Assignment/>
                            </ListItemIcon>
                            <ListItemText primary='Words'/>
                        </ListItem>
                        <ListItem
                            button
                            selected={location.pathname.split('/')[1] === 'boards'}
                            onClick={() => navigate('/boards/7W4gccMNsgyktqRi2gVv')}
                        >
                            <ListItemIcon>
                                <Assignment/>
                            </ListItemIcon>
                            <ListItemText primary='Boards'/>
                        </ListItem>
                        <ListItem
                            button
                            selected={location.pathname.split('/')[1] === 'games'}
                            onClick={() => navigate('/games/7W4gccMNsgyktqRi2gVv')}
                        >
                            <ListItemIcon>
                                <Assignment/>
                            </ListItemIcon>
                            <ListItemText primary='Codenames'/>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box>
                {children}
            </Box>
        </div>
    );
};

export default Layout;