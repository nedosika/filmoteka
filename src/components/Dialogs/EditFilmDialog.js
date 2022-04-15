import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import filmsActions from '../../actions/filmsActions';
import useSmartActionRTK from '../../hooks/useSmartActionRTK';
import Dialog from '../Dialog/Dialog';
import useDialog from '../DialogManager/useDialog';
import Image from '../Image';
import Loader from '../Loader';
import { DIALOG_TYPES } from './index';

const EditFilmDialog = ({ id }) => {
  const { openDialog, closeDialog } = useDialog();
  const mapState = (state) => ({
    isLoading: state.loading.isLoading,
    currentFilm: state.films.current,
  });
  const { currentFilm, isLoading } = useSelector(mapState);
  const getFilm = useSmartActionRTK(filmsActions.getFilm);
  const updateFilm = useSmartActionRTK(
    filmsActions.updateFilm,
    { notices: { fulfilled: 'Film updated', rejected: false } },
    (result) => {
      result?.status === 'validation error' ? formik.setErrors(result.data) : closeDialog();
    },
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      genre: '',
      year: '',
      img: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(25, 'Must be 25 symbols or less').required('Required'),
      img: Yup.string(),
      year: Yup.number().required('Required'),
      description: Yup.string().max(255, 'Must be 255 symbols or less'),
    }),
    onSubmit: (values) => {
      updateFilm({ ...values });
    },
  });

  useEffect(() => {
    getFilm(id);
  }, [id]);

  useEffect(() => {
    formik.setValues(currentFilm);
  }, [currentFilm]);

  const handleRemove = () => {
    openDialog(DIALOG_TYPES.DELETE_FILM, { id });
  };

  if (isLoading) return <Loader />;

  return (
    <Dialog
      title="Editing film"
      open
      onClose={closeDialog}
      dialogActions={
        <DialogActions sx={{ justifyContent: 'space-between', padding: '20px 24px' }}>
          <Button variant="outlined" color="warning" onClick={handleRemove}>
            Remove
          </Button>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="outlined" color="secondary" onClick={formik.handleSubmit} disabled={!formik.isValid}>
              Approve
            </Button>
          </Stack>
        </DialogActions>
      }
    >
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.errors.name && true}
        helperText={formik.errors.name}
      />
      <Stack direction="row" spacing={2} sx={{ width: '100%', marginTop: '10px' }}>
        <FormControl fullWidth error={formik.errors.genre && true}>
          <InputLabel>Genre</InputLabel>
          <Select name="genre" label="Genre" onChange={formik.handleChange} value={formik.values.genre}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Detective">Detective</MenuItem>
            <MenuItem value="Anime">Anime</MenuItem>
            <MenuItem value="BlockBaster">BlockBaster</MenuItem>
            <MenuItem value="RomCom">RomCom</MenuItem>
            <MenuItem value="SciFi">SciFi</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
          </Select>
          <FormHelperText>{formik.errors.genre}</FormHelperText>
        </FormControl>
        <TextField
          type="number"
          label="Year"
          name="year"
          value={formik.values.year}
          fullWidth
          onChange={formik.handleChange}
          error={formik.errors.year && true}
          helperText={formik.errors.year}
        />
      </Stack>
      <TextField
        label="Image link"
        name="img"
        value={formik.values.img}
        fullWidth
        margin="normal"
        onChange={formik.handleChange}
        alt="film image"
        error={formik.errors.img && true}
        helperText={formik.errors.img}
      />
      <Image image={formik.values.img} height={140} alt="film image" />
      <TextField
        label="Description"
        name="description"
        multiline
        rows={4}
        value={formik.values.description}
        fullWidth
        margin="normal"
        onChange={formik.handleChange}
        error={formik.errors.description && true}
        helperText={formik.errors.description}
      />
    </Dialog>
  );
};

export default EditFilmDialog;
