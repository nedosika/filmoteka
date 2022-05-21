import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllTheProviders from './components/AllTheProviders';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import Router from './router';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <AllTheProviders>
            <Router />
          </AllTheProviders>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
