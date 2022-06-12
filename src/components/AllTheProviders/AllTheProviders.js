import React from 'react';
import { Provider } from 'react-redux';
import { DialogProvider } from '@Components/DialogManager/useDialog';
import SnackStack from '@Components/SnackStack';
import { createReduxStore } from '@Store';

const AllTheProviders = ({ children }) => (
  <Provider store={createReduxStore()}>
    <DialogProvider>{children}</DialogProvider>
    <SnackStack />
  </Provider>
);

export default AllTheProviders;
