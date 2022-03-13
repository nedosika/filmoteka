import React, { useState } from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { addFilm as addFilmAction } from '../../actions';
import useExists from '../../hooks/useExists';
import useSmartAction from '../../hooks/useSmartAction';
import useDialog from '../DialogManager/useDialog';
import Dialog from './Dialog';

const emptyImageUrl =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2PQLJct8f706qIUu-8prSvosyYjCkRRJLxESsxodRUs7YTwCzwj5cXybNk5vMcJGWs5w&usqp=CAU';

const AddFilmDialog = () => {
  const { closeDialog } = useDialog();
  const addFilm = useSmartAction(addFilmAction);
  const [state, setState] = useState({
    name: '',
    img: '',
    description: '',
    genre: '',
  });

  const isExists = useExists(state.img);

  const handleClose = () => {
    closeDialog();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addFilm({ ...state });
    handleClose();
  };

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Dialog
      title="Adding film"
      open
      onClose={handleClose}
      dialogActions={
        <DialogActions sx={{ padding: '20px 24px' }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleSubmit}>
            Approve
          </Button>
        </DialogActions>
      }
    >
      <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
      <Stack direction="row" spacing={2} sx={{ width: '100%', marginTop: '10px' }}>
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select name="genre" label="Genre" onChange={handleChange} defaultValue="Detective">
            <MenuItem value="Detective">Detective</MenuItem>
            <MenuItem value="Anime">Anime</MenuItem>
            <MenuItem value="BlockBaster">BlockBaster</MenuItem>
            <MenuItem value="RomCom">RomCom</MenuItem>
            <MenuItem value="SciFi">SciFi</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
          </Select>
        </FormControl>
        <TextField type="number" label="Year" name="year" fullWidth onChange={handleChange} />
      </Stack>
      <TextField label="Image link" name="img" fullWidth margin="normal" onChange={handleChange} />
      <CardMedia
        component="img"
        height="140"
        image={isExists ? state.img : emptyImageUrl}
        alt="film image"
        onChange={handleChange}
      />
      <TextField
        label="Description"
        name="description"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
    </Dialog>
  );
};

export default AddFilmDialog;
