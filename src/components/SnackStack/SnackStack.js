import React from 'react';
import {Stack} from "@mui/material";

import SnackBar from "../SnackBar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

const SnackStack = () => {
    const [snacks, setSnacks] = React.useState([
        {
            message: 'test1',
            isOpen: true
        }
    ]);

    const handleClose = (index) => (event, reason) => {
        if(reason !== 'clickaway')
            setSnacks((prevState) =>
            [
                ...prevState.slice(0, index),
                {...prevState[index], isOpen: false},
                ...prevState.slice(index + 1)
            ]
        );
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
                snacks.map((snack, index) =>
                    <SnackBar
                        key={index}
                        message={snack.message}
                        open={snack.isOpen}
                        onClose={handleClose(index)}
                    />)
            }
            <Button onClick={() =>
                setSnacks((prevState) => [
                    ...prevState, {
                        message: 'test2',
                        isOpen: true
                    }
                ])
            }>
                test
            </Button>
        </Stack>
    );
};

export default SnackStack;