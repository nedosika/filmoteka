import React from 'react';
import {useNavigate} from "react-router-dom";

import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddFilmButton = () => {
    const navigate = useNavigate();

    return (
        <Card sx={{height: '100%'}}>
            <CardActionArea sx={{height: '100%'}} onClick={() => navigate('add')} >
                <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                    <AddCircleIcon fontSize='large' color='disabled'/>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
export default AddFilmButton;