import React from 'react';
import {useSelector} from "react-redux";

import {Stack} from "@mui/material";

import SnackBar from "./SnackBar";
import useActions from "../../hooks/useActions";

const SnackStack = () => {
    const mapState = (state) => state.notice
    const {notices} = useSelector(mapState);
    const {hideNotice} = useActions();

    const handleClose = (key) => (event, reason) => {
        if (reason !== 'clickaway') {
            hideNotice(key);
        }
    }

    return (
        <Stack
            spacing={1}
            sx={{
                bottom: '24px',
                left: '24px',
                right: 'auto',
                position: 'fixed'
            }}>
            {
                notices.map((notice) =>
                    <SnackBar
                        key={notice.key}
                        severity={notice.severity}
                        message={notice.message}
                        open={notice.isOpen}
                        onClose={handleClose(notice.key)}
                    />)
            }
        </Stack>
    );
};

export default SnackStack;