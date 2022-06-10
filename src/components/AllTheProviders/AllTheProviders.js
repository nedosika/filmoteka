import React from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'Store';
import { DialogProvider } from '../DialogManager/useDialog';
import SnackStack from '../SnackStack';

const AllTheProviders = ({ children }) => (
  <Provider store={createReduxStore()}>
    <DialogProvider>{children}</DialogProvider>
    <SnackStack />
  </Provider>
);

export default AllTheProviders;
