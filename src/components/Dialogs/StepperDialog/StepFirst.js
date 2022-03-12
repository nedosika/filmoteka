import React from 'react';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import useStepper from "./useStepper";

const StepFirst = () => {
    const {onNext, state, onChange} = useStepper();

    const handleChangeName = (event) => {
        onChange({name: event.target.value})
    }

    const handleChangeImage = (event) => {
        onChange({img: event.target.value})
    }

    return (
        <>
            <DialogTitle>Step 1</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    name="name"
                    value={state.name || ''}
                    fullWidth
                    margin="normal"
                    onChange={handleChangeName}
                />
                <TextField
                    label="Image link"
                    name="img"
                    value={state.img || ''}
                    fullWidth
                    margin="normal"
                    onChange={handleChangeImage}
                />
                <CardMedia
                    component="img"
                    height="140"
                    image={state.img || ''}
                    alt="film image"
                />
            </DialogContent>
            <DialogActions sx={{padding: '20px 24px'}}>
                <Button variant="outlined"  onClick={onNext}>Next</Button>
            </DialogActions>
        </>
    );
};

export default StepFirst;