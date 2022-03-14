import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {getFilm as getFilmAction, updateFilm as updateFilmAction} from '../../actions';
import useSmartAction from '../../hooks/useSmartAction';
import useDialog from '../DialogManager/useDialog';
import Loader from '../Loader';
import Dialog from './Dialog';
import {DIALOG_TYPES} from './index';
import {Skeleton} from "@mui/material";
import useImageExists from "../../hooks/useImageExists";

const emptyImageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2PQLJct8f706qIUu-8prSvosyYjCkRRJLxESsxodRUs7YTwCzwj5cXybNk5vMcJGWs5w&usqp=CAU';

const EditFilmDialog = ({id}) => {
    const {openDialog, closeDialog} = useDialog();
    const mapState = (state) => ({
        isLoading: state.loading.isLoading,
        currentFilm: state.films.current,
    });
    const {currentFilm, isLoading} = useSelector(mapState);
    const updateFilm = useSmartAction(updateFilmAction);
    const getFilm = useSmartAction(getFilmAction);

    const [film, setFilm] = useState({
        name: '',
        genre: '',
        year: '',
        img: '',
        description: ''
    });

    const isImageExists = useImageExists(film.img);

    useEffect(() => {
        getFilm(id);
    }, [id]);

    useEffect(() => {
        setFilm({...currentFilm})
    }, [currentFilm])

    const handleRemove = () => {
        openDialog(DIALOG_TYPES.DELETE_FILM, {id});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateFilm({...film});
        closeDialog();
    };

    const handleChange = (event) => {
        setFilm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    if (isLoading)
        return <Loader/>;

    return (
        <Dialog
            title="Editing film"
            open
            onClose={closeDialog}
            dialogActions={
                <DialogActions sx={{justifyContent: 'space-between', padding: '20px 24px'}}>
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={handleRemove}
                    >
                        Remove
                    </Button>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleSubmit}
                        >
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
                onChange={handleChange}
                value={film.name}
            />
            <Stack
                direction="row"
                spacing={2}
                sx={{width: '100%', marginTop: '10px'}}
            >
                <FormControl fullWidth>
                    <InputLabel>Genre</InputLabel>
                    <Select
                        name="genre"
                        label="Genre"
                        onChange={handleChange}
                        value={film.genre}
                    >
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
                </FormControl>
                <TextField
                    type="number"
                    label="Year"
                    name="year"
                    value={film.year}
                    fullWidth
                    onChange={handleChange}
                />
            </Stack>
            <TextField
                label="Image link"
                name="img"
                value={film.img}
                fullWidth
                margin="normal"
                onChange={handleChange}
                alt="film image"
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
            <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                value={film.description}
                fullWidth
                margin="normal"
                onChange={handleChange}
            />
        </Dialog>
    );
};

export default EditFilmDialog;
