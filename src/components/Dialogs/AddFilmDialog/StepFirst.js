import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from '../../Image';
import { useStepper } from '../../Stepper';

const StepFirst = () => {
  const { onNext, values } = useStepper();
  const formik = useFormik({
    initialValues: {
      name: values.name || '',
      img: values.img || '',
    },
    initialErrors: values.error,
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Must be 3 symbols or more').max(25, 'Must be 25 symbols or less').required('Required'),
      img: Yup.string(),
    }),
    onSubmit: (values) => {
      onNext({ ...values, error: null });
    },
  });

  return (
    <>
      <DialogTitle data-testid="title">Step 1</DialogTitle>
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
          data-testid="film-name"
        />
        <TextField
          label="Image link"
          name="img"
          value={formik.values.img}
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          error={formik.errors.img && true}
          helperText={formik.errors.img}
          data-testid="film-img-link"
        />
        <Image height="140" image={formik.values.img} alt="film image" data-testid="film-img" />
      </DialogContent>
      <DialogActions sx={{ padding: '20px 24px' }}>
        <Button variant="outlined" onClick={formik.handleSubmit} disabled={!formik.isValid}>
          Next
        </Button>
      </DialogActions>
    </>
  );
};

export default StepFirst;
