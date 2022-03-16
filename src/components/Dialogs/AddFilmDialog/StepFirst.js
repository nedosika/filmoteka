import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Image from '../../Image';
import { useStepper } from '../../Stepper';

const StepFirst = () => {
  const { onNext, state: film, onChange } = useStepper();

  const handleChangeName = (event) => {
    onChange({ name: event.target.value });
  };

  const handleChangeImage = (event) => {
    onChange({ img: event.target.value });
  };

  return (
    <>
      <DialogTitle>Step 1</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={film.name || ''}
          fullWidth
          margin="normal"
          onChange={handleChangeName}
        />
        <TextField
          label="Image link"
          name="img"
          value={film.img || ''}
          fullWidth
          margin="normal"
          onChange={handleChangeImage}
        />
        <Image height="140" image={film.img} alt="film image" />
      </DialogContent>
      <DialogActions sx={{ padding: '20px 24px' }}>
        <Button variant="outlined" onClick={onNext}>
          Next
        </Button>
      </DialogActions>
    </>
  );
};

export default StepFirst;
