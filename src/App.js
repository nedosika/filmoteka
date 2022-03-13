import React from 'react';
import { DialogProvider } from './components/DialogManager/useDialog';
import SnackStack from './components/SnackStack';
import Router from './router';

function App() {
  return (
    <DialogProvider>
      <Router />
      <SnackStack />
    </DialogProvider>
  );
}

export default App;
