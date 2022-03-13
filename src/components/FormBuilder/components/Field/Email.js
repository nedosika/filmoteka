import React from 'react';
import { FIELDS } from '../../index';
import Input from './Input';

const Email = (props) => {
  const { validation } = props;

  return <Input {...props} validation={{ ...validation, [FIELDS.email.validators.email]: true }} />;
};

export default Email;
