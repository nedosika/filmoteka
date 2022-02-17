import React from 'react';
import {useSelector} from "react-redux";

import {Stack} from "@mui/material";

import SnackBar from "./SnackBar";
import useActions from "../../hooks/useActions";

const SnackStack = () => {
    const mapState = (state) => state.notice
    const {notices} = useSelector(mapState);
    const {hideNotice, removeNotice} = useActions();

    const handleClose = (key) => (event, reason) => {
        if (reason !== 'clickaway') {
            hideNotice(key);
        }
    }

    const handleEnd = (key) => () => {
        removeNotice(key);
    }

    return (
        <Stack
            spacing={1}
            sx={{
                left: '24px',
                right: 'auto',
                bottom: '24px',
                position: 'fixed'
            }}
        >
            {
                notices.map(({
                                 key,
                                 isOpen,
                                 message,
                                 severity
                             }) =>
                    <SnackBar
                        key={key}
                        open={isOpen}
                        message={message}
                        severity={severity}
                        onEnd={handleEnd(key)}
                        onClose={handleClose(key)}

                    />
                )
            }
        </Stack>
    );
};

export default SnackStack;