import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const AddFilmButton = ({ onClick }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea sx={{ height: '100%' }} onClick={onClick}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <AddCircleIcon fontSize="large" color="disabled" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default AddFilmButton;
