import React from 'react';

import MUIDialog from "@mui/material/Dialog";
import useStepper from "../../useStepper";

const StepperDialog = ({children}) => {
    const {activeStep, closeDialog} = useStepper();

    return (
        <MUIDialog
            component="form"
            open
            onClose={() => closeDialog()}
        >
            {children[activeStep]}
        </MUIDialog>
    );
}

export default StepperDialog;