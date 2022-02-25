import React, {Children} from 'react';

import Button from "@mui/material/Button";
import MUIDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import useStepper from "../../useStepper";

const StepperDialog = ({children}) => {
    const firstElement = 0;
    const lastElement = Children.count(children) - 1;
    const {onNext, onPrev, activeStep, closeDialog} = useStepper();

    const handleNext = () => {
        if (activeStep < lastElement)
            onNext();
    }

    return (
        <MUIDialog
            component="form"
            open
            onClose={() => closeDialog()}
        >
            {children[activeStep]}
            <DialogActions sx={{padding: '20px 24px'}}>
                <Button variant="outlined" disabled={activeStep === firstElement} onClick={onPrev}>Prev</Button>
                <Button variant="outlined" disabled={activeStep === lastElement} onClick={handleNext}>Next</Button>
            </DialogActions>
        </MUIDialog>
    );
}

export default StepperDialog;