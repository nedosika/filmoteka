import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import useStepper from './useStepper';
import useSmartAction from '../../../hooks/useSmartAction';
import { addFilm as addFilmAction } from '../../../actions';

const StepTwo = () => {
  const { state, onChange, onPrev, onNext } = useStepper();
  const addFilm = useSmartAction(addFilmAction);

  const handleChangeName = (event) => {
    onChange({ name: event.target.value });
  };

  const handleChangeDescription = (event) => {
    onChange({
      description: event.target.value,
    });
  };

  const handleSubmit = () => {
    onNext();
    addFilm(state);
  };

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
          onChange={handleChangeName}
        />
        <TextField
          label="Description"
          name="description"
          value={state.description || ''}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          onChange={handleChangeDescription}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '20px 24px' }}>
        <Button variant="outlined" onClick={onPrev}>
          Prev
        </Button>
        <Button variant="outlined" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </>
  );
};

export default StepTwo;
