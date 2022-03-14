import React from 'react';
import MUIDialog from '@mui/material/Dialog';
import useStepper from './useStepper';
import useDialog from "../../DialogManager/useDialog";

const StepperDialog = ({children}) => {
    const {activeStep} = useStepper();
    const {closeDialog} = useDialog();

    return (
        <MUIDialog component="form" open onClose={closeDialog}>
            {children[activeStep]}
        </MUIDialog>
    );
};

export default StepperDialog;
