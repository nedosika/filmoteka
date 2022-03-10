import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import useStepper from "../../useStepper";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const StepTwo = () => {
    const {state, onChange, onPrev, onSubmit} = useStepper();

    return (
        <>
            <DialogTitle>Step 2</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    name="name"
                    value={state.name || ''}
                    fullWidth
                    margin="normal"
                    onChange={onChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={state.description || ''}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions sx={{padding: '20px 24px'}}>
                <Button variant="outlined" onClick={onPrev}>Prev</Button>
                <Button variant="outlined" onClick={onSubmit}>Add</Button>
            </DialogActions>
        </>
    );
};

export default StepTwo;