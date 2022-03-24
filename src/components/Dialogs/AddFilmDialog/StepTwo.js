import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import filmsActions from '../../../actions/filmsActions';
import useSmartAction from '../../../hooks/useSmartAction';
import { useStepper } from '../../Stepper';

const StepTwo = () => {
  const { state: film, onChange, onPrev, onNext } = useStepper();
  const addFilm = useSmartAction(filmsActions.addFilm);

  const handleChangeName = (event) => {
    onChange({
      name: event.target.value,
    });
  };

  const handleChangeDescription = (event) => {
    onChange({
      description: event.target.value,
    });
  };

  const handleGenreChange = (event) => {
    onChange({
      genre: event.target.value,
    });
  };

  const handleYearChange = (event) => {
    onChange({
      year: event.target.value,
    });
  };

  const handleSubmit = () => {
    onNext();
    addFilm(film);
  };

  return (
    <>
      <DialogTitle>Step 2</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={film.name || ''}
          fullWidth
          margin="normal"
          onChange={handleChangeName}
        />
        <Stack direction="row" spacing={2} sx={{ width: '100%', marginTop: '10px' }}>
          <FormControl fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select name="genre" label="Genre" onChange={handleGenreChange} defaultValue="Detective">
              <MenuItem value="Detective">Detective</MenuItem>
              <MenuItem value="Anime">Anime</MenuItem>
              <MenuItem value="BlockBaster">BlockBaster</MenuItem>
              <MenuItem value="RomCom">RomCom</MenuItem>
              <MenuItem value="SciFi">SciFi</MenuItem>
              <MenuItem value="Horror">Horror</MenuItem>
            </Select>
          </FormControl>
          <TextField type="number" label="Year" name="year" fullWidth onChange={handleYearChange} />
        </Stack>
        <TextField
          label="Description"
          name="description"
          value={film.description || ''}
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
