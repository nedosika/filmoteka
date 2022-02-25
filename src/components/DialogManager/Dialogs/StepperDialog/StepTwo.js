import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import useStepper from "../../useStepper";

const StepTwo = () => {
    const {state, handleChange} = useStepper();

    return (
        <>
            <DialogTitle>Step 2</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    name="name"
                    value={state.name}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={state.description}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
            </DialogContent>
        </>
    );
};

export default StepTwo;