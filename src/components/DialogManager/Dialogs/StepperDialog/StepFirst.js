import React from 'react';

import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import useStepper from "../../useStepper";

const StepFirst = () => {
    const {state, handleChange} = useStepper();

    return (
        <>
            <DialogTitle>Step 1</DialogTitle>
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
                    label="Image link"
                    name="img"
                    value={state.img}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <CardMedia
                    component="img"
                    height="140"
                    image={state.img}
                    alt="film image"
                    onChange={handleChange}
                />
            </DialogContent>
        </>
    );
};

export default StepFirst;