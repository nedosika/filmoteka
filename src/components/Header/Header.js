import React from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import searchActions from '../../actions/searchActions';
import useActions from '../../hooks/useActions';
import { useRouter } from '../../hooks/useRouter';
import useDialog from '../DialogManager/useDialog';
import { DIALOG_TYPES } from '../Dialogs';
import Search from '../Search';

const Header = ({ title, onOpenMenuBar }) => {
  const { navigate } = useRouter();
  const mapState = (state) => ({
    isAuth: state.auth.isAuth,
    isLoading: state.loading.isLoading,
    options: state.search.options,
  });
  const { isAuth, isLoading, options } = useSelector(mapState);
  const { openDialog } = useDialog();
  const getSearchOptions = useActions(searchActions.getSearchOptions);

  const handleSearch = (query) => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        query,
      })}`,
    });
  };

  const handleSubmit = (id) => {
    navigate(`/film/${id}`);
  };

  const handleAddFilm = () => {
    openDialog(DIALOG_TYPES.ADD_FILM);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            data-testid="menu-button"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={onOpenMenuBar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {isAuth && (
            <Button color="inherit" variant="outlined" sx={{ mr: 2 }} onClick={handleAddFilm}>
              Add film
            </Button>
          )}
          <Search search={getSearchOptions} options={options} onSearch={handleSearch} onSubmit={handleSubmit} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="large" edge="end" color="inherit">
              {isLoading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                isAuth && <AccountCircle data-testid="account" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
