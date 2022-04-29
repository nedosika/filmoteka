import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import { DialogProvider } from '../DialogManager/useDialog';

const AllTheProviders = ({ children }) => (
  <Provider store={store}>
    <DialogProvider>{children}</DialogProvider>
  </Provider>
);

export default AllTheProviders;
