import React from 'react';

import Router from './router';
import SnackStack from './components/SnackStack';
import { DialogProvider } from './components/DialogManager/useDialog';

function App() {
  return (
    <DialogProvider>
      <Router />
      <SnackStack />
    </DialogProvider>
  );
}

export default App;
