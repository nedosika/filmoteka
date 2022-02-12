import React from 'react';
import {useSelector} from "react-redux";

import Box from "@mui/material/Box";

import Header from "../components/Header";
import useActions from "../hooks/useActions";
import SnackBar from "../components/SnackBar";
import SideBarMenu from "../components/SideBarMenu";

const Layout = ({title, children}) => {
    const mapState = (state) => ({
        notice: state.notice,
    });
    const {notice} = useSelector(mapState);
    const {hideNotice} = useActions();
    const [isOpenMenuBar, setIsOpenMenuBar] = React.useState(false);

    const handleOpenMenuBar = () => {
        setIsOpenMenuBar(true);
    }

    const handleCloseMenuBar = () => {
        setIsOpenMenuBar(false);
    }

    return (
        <div>
            <Header title={title} onOpenMenuBar={handleOpenMenuBar}/>
            <SideBarMenu isOpen={isOpenMenuBar} onClose={handleCloseMenuBar}/>
            <Box sx={{marginTop: '80px'}}>
                {children}
            </Box>
            <SnackBar
                open={notice.isShow}
                message={notice.message}
                onClose={hideNotice}
                severity={notice.severity}
            />
        </div>
    );
};

export default Layout;