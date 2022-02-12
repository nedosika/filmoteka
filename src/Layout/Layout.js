import React from 'react';

import Box from "@mui/material/Box";

import Header from "../components/Header";
import SideBarMenu from "../components/SideBarMenu";

const Layout = ({title, children}) => {
    const [isOpenMenuBar, setIsOpenMenuBar] = React.useState(false);

    const handleOpenMenuBar = () => {
        setIsOpenMenuBar(true);
    }

    const handleCloseMenuBar = () => {
        setIsOpenMenuBar(false);
    }

    return (
        <>
            <Header title={title} onOpenMenuBar={handleOpenMenuBar}/>
            <SideBarMenu isOpen={isOpenMenuBar} onClose={handleCloseMenuBar}/>
            <Box sx={{marginTop: '80px'}}>
                {children}
            </Box>
        </>
    );
};

export default Layout;