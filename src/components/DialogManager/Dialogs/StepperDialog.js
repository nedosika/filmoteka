import React from 'react';

import Button from "@mui/material/Button";
import MUIDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import useDialog from "../useDialog";
import useStepper from "../useStepper";
import StepFirst from "./StepFirst";
import StepTwo from "./StepTwo";

const steps = [
    <StepFirst/>,
    <StepTwo/>
]

const StepperDialog = () => {
    const {closeDialog} = useDialog();
    const {onNext, onPrev, activeStep} = useStepper();

    const handleNext = () => {
        if(activeStep < steps.length - 1)
            onNext();
    }

    const Component = () => steps[activeStep]

    return (
        <MUIDialog
            component="form"
            open
            onClose={() => closeDialog()}
        >
            <Component/>
            <DialogActions sx={{padding: '20px 24px'}}>
                <Button variant="outlined" disabled={activeStep === 0} onClick={onPrev}>Prev</Button>
                <Button variant="outlined" disabled={activeStep >= steps.length - 1} onClick={handleNext}>Next</Button>
            </DialogActions>
        </MUIDialog>
    );
}

export default StepperDialog;