import React, {useState} from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import DialogContent from "@mui/material/DialogContent";
import useStepper from "../../useStepper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const StepThree = () => {
    const {isLoading, error, closeDialog} = useStepper();

    const Content = () => {
        if(isLoading)
            return <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        if(error)
            return <div>Error: {error}</div>
        return <div>Added ok</div>
    }

    const disabled = isLoading || error;

    return (
        <>
            <DialogTitle>Step 3 Saving</DialogTitle>
            <DialogContent>
                <Content/>
            </DialogContent>
            <DialogActions sx={{padding: '20px 24px'}}>
                <Button variant="outlined" disabled={disabled} onClick={() => closeDialog()}>Ok</Button>
            </DialogActions>
        </>
    );
};

export default StepThree;