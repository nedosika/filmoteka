import React from 'react';

import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardContent from "@mui/material/CardContent";

const AddCard = () =>
        <Card sx={{height: '100%'}}>
            <CardActionArea sx={{height: '100%'}}>
                <CardContent sx={{display:'flex', justifyContent: 'center'}}>
                    <AddCircleIcon fontSize='large' color='disabled'/>
                </CardContent>
            </CardActionArea>
        </Card>

export default AddCard;