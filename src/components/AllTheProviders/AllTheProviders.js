import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createReduxStore } from '../../store';
import { DialogProvider } from '../DialogManager/useDialog';
import Loader from '../Loader';
import SnackStack from '../SnackStack';

const AllTheProviders = ({ children }) => (
  <Provider store={createReduxStore()}>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <DialogProvider>{children}</DialogProvider>
      </BrowserRouter>
    </Suspense>
    <SnackStack />
  </Provider>
);

export default AllTheProviders;
