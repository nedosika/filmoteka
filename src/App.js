import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllTheProviders from './components/AllTheProviders';
import Loader from './components/Loader';
import Router from './router';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <AllTheProviders>
          <Router />
        </AllTheProviders>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
