import React from 'react';
import {IconButton} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {styled} from "@mui/material/styles";

const StyledItem = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'spaceBetween',
}));

const AutocompleteItem = ({onClick, value, onHook, ...props}) => {
    return (
        <li {...props}>
            <StyledItem>
                <div onClick={onClick}>{value}</div><IconButton onClick={onHook}><ShareIcon/></IconButton>
            </StyledItem>
        </li>
    );
};

export default AutocompleteItem;