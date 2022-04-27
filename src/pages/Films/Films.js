import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import filmsActions, { FILMS_PER_PAGE } from '../../actions/filmsActions';
import useDialog from '../../components/DialogManager/useDialog';
import Films from '../../components/Films/Films';
import { generateSkeletonsArray } from '../../helpers/generateSkeletonsArray';
import useSmartActionRTK from '../../hooks/useSmartActionRTK';
import { SMART_ACTION_OPTIONS } from '../../hooks/useSmartActionRTK';
import { filmsSelectors } from '../../reducers/filmsReducer';
import { queriesSelector } from '../../reducers/queriesReducer';

const FilmsPage = () => {
  const [filmsPerPage, setFilmsPerPage] = useState(FILMS_PER_PAGE);
  const [queryId, setQueryId] = useState(null);
  const [sort, setSort] = useState({
    field: 'name',
    order: 'ASC',
  });
  const getFilms = useSmartActionRTK(filmsActions.getFilms, {
    [SMART_ACTION_OPTIONS.pending]: (id) => {
      setQueryId(id);
    },
    [SMART_ACTION_OPTIONS.error]: (error) => error.message,
  });

  const mapState = (state) => ({
    isLoading: queriesSelector.selectById(state, queryId),
    page: state.films.page,
    pages: state.films.pages,
    films: filmsSelectors.selectAll(state),
    isAuth: state.auth.isAuth,
  });

  const { page, pages, films, isAuth, isLoading } = useSelector(mapState);

  const { openDialog } = useDialog();

  const handleChangePage = (event, page = 1) => {
    getFilms({ page, field: sort.field, order: sort.order, limit: filmsPerPage });
  };

  const handleOpenDialog = (dialog, id) => () => {
    openDialog(dialog, { id });
  };

  const handleChange = (event) => {
    switch (event.target.value) {
      case 'Name asc':
        setSort({ field: 'name', order: 'ASC' });
        break;
      case 'Name desc':
        setSort({ field: 'name', order: 'DESC' });
        break;
      case 'Year asc':
        setSort({ field: 'year', order: 'ASC' });
        break;
      case 'Year desc':
        setSort({ field: 'year', order: 'DESC' });
        break;
      case 'Genre asc':
        setSort({ field: 'genre', order: 'ASC' });
        break;
      case 'Genre desc':
        setSort({ field: 'genre', order: 'DESC' });
        break;
    }
  };

  const handleChangePageCount = (event) => {
    setFilmsPerPage(event.target.value);
  };

  useEffect(handleChangePage, [sort, filmsPerPage]);

  return (
    <Films
      films={isLoading ? generateSkeletonsArray(FILMS_PER_PAGE) : films}
      isLoading={isLoading}
      isAuth={isAuth}
      filmsPerPage={filmsPerPage}
      onChangePage={handleChangePage}
      onOpenDialog={handleOpenDialog}
      onChangeSort={handleChange}
      onChangePageCount={handleChangePageCount}
      pages={pages}
      page={page}
    />
  );
};

export default FilmsPage;
