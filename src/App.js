import React from 'react';
import AllTheProviders from './components/AllTheProviders';
import SnackStack from './components/SnackStack';
import Router from './router';

function App() {
  return (
    <AllTheProviders>
      <Router />
      <SnackStack />
    </AllTheProviders>
  );
}

export default App;
