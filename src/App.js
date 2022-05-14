import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllTheProviders from './components/AllTheProviders';
import Router from './router';

function App() {
  return (
    <BrowserRouter>
      <AllTheProviders>
        <Router />
      </AllTheProviders>
    </BrowserRouter>
  );
}

export default App;
