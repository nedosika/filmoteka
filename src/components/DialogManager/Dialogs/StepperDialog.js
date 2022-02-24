import React, {useState} from 'react';
import Stepper from "../../Stepper";
import MUIDialog from "@mui/material/Dialog";
import useDialog from "../useDialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


const StepperDialog = () => {
    const {closeDialog} = useDialog();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevState) => prevState + 1);
    }

    const handlePrev = () => {
        setActiveStep((prevState) => prevState - 1);
    }

    return (
        <MUIDialog
            component="form"
            open
            onClose={() => closeDialog()}
        >
            <Stepper
                activeStep={activeStep}
                actionPanel={
                    <DialogActions sx={{padding: '20px 24px'}}>
                        <Button variant="outlined" onClick={handleNext}>Next</Button>
                        <Button variant="outlined" onClick={handlePrev}>Prev</Button>
                    </DialogActions>
                }
            >
                <div>one</div>
                <div>two</div>
                <div>three</div>
            </Stepper>
        </MUIDialog>
    );
}

export default StepperDialog;