import React from 'react';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useStepper from './useStepper';
import useImageExists from "../../../hooks/useImageExists";
import {Skeleton} from "@mui/material";
const emptyImageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2PQLJct8f706qIUu-8prSvosyYjCkRRJLxESsxodRUs7YTwCzwj5cXybNk5vMcJGWs5w&usqp=CAU';

const StepFirst = () => {
  const { onNext, state: film, onChange } = useStepper();

  const handleChangeName = (event) => {
    onChange({ name: event.target.value });
  };

  const handleChangeImage = (event) => {
    onChange({ img: event.target.value });
  };

  const isImageExists = useImageExists(film.img);

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
          {
              isImageExists === null
                  ?
                  <Skeleton variant="rectangular" width="100%" height={140}/>
                  :
                  <CardMedia
                      component="img"
                      height="140"
                      image={isImageExists ? film.img : emptyImageUrl}
                      alt="film image"
                  />
          }
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
