import React from 'react';

import MUIDialog from "@mui/material/Dialog";
import useDialog from "../useDialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import useStepper from "../../Stepper/useStepper";

const steps = [
    <div>one</div>,
    <div>two</div>,
    <div>three</div>
]

const StepperDialog = () => {
    const {closeDialog} = useDialog();
    const {onNext, onPrev, activeStep} = useStepper();

    const handleNext = () => {
        if(activeStep < steps.length - 1)
            onNext();
    }

    return (
        <MUIDialog
            component="form"
            open
            onClose={() => closeDialog()}
        >
            {steps[activeStep]}
            <DialogActions sx={{padding: '20px 24px'}}>
                <Button variant="outlined" onClick={onPrev}>Prev</Button>
                <Button variant="outlined" onClick={handleNext}>Next</Button>
            </DialogActions>
        </MUIDialog>
    );
}

export default StepperDialog;