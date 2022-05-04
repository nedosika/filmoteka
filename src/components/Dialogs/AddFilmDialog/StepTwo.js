import React, { useEffect } from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import filmsActions from '../../../actions/filmsActions';
import useSmartActionRTK, { SMART_ACTION_OPTIONS } from '../../../hooks/useSmartActionRTK';
import { useStepper } from '../../Stepper';

const StepTwo = () => {
  const { onNext, onPrev, values, onChange } = useStepper();
  const { action: addFilm } = useSmartActionRTK(filmsActions.addFilm, {
    [SMART_ACTION_OPTIONS.success]: () => {
      onChange({ isLoading: false });
    },
    [SMART_ACTION_OPTIONS.error]: (error) => {
      onChange({ error, isLoading: false });
    },
  });

  console.log(values);

  const formik = useFormik({
    initialValues: {
      name: values.name || '',
      genre: values.genre || 'Detective',
      img: values.img || '',
      year: values.year || 1990,
      description: values.description || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Must be 3 symbols or more').max(25, 'Must be 25 symbols or less').required('Required'),
      img: Yup.string(),
      year: Yup.number(),
      description: Yup.string().max(255, 'Must be 255 symbols or less'),
    }),
    initialErrors: values.error,
    onSubmit: (values) => {
      onNext({ ...values, isLoading: true, error: null });
      addFilm(values);
    },
  });

  const handlePrev = () => {
    onPrev(formik.values);
  };

  return (
    <>
      <DialogTitle>Step 2</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          error={formik.errors.name && true}
          helperText={formik.errors.name}
        />
        <Stack direction="row" spacing={2} sx={{ width: '100%', marginTop: '10px' }}>
          <FormControl fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select name="genre" label="Genre" value={formik.values.genre} onChange={formik.handleChange}>
              <MenuItem value="Detective">Detective</MenuItem>
              <MenuItem value="Anime">Anime</MenuItem>
              <MenuItem value="BlockBaster">BlockBaster</MenuItem>
              <MenuItem value="RomCom">RomCom</MenuItem>
              <MenuItem value="SciFi">SciFi</MenuItem>
              <MenuItem value="Horror">Horror</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            label="Year"
            name="year"
            value={formik.values.year}
            fullWidth
            onChange={formik.handleChange}
          />
        </Stack>
        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          error={formik.errors.description && true}
          helperText={formik.errors.description}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '20px 24px' }}>
        <Button variant="outlined" onClick={handlePrev}>
          Prev
        </Button>
        <Button variant="outlined" onClick={formik.handleSubmit} disabled={!formik.isValid}>
          Add
        </Button>
      </DialogActions>
    </>
  );
};

export default StepTwo;
