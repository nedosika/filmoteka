import React from 'react';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledItem = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const AutocompleteItem = ({ value, onHook, ...props }) => {
  return (
    <li {...props}>
      <StyledItem>
        <div>{value}</div>
        <IconButton onClick={onHook}>
          <NorthWestIcon />
        </IconButton>
      </StyledItem>
    </li>
  );
};

export default AutocompleteItem;
