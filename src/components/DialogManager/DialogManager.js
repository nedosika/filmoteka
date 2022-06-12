import React from 'react';
import { Dialogs } from '@Components/Dialogs';

const DialogManager = ({ dialogs }) =>
  dialogs.map(({ type, props = {} }, index) => {
    const Component = Dialogs[type];

    return <Component {...props} key={type + index} />;
  });

export default DialogManager;
