import React from 'react';
import { FIELDS } from '../../index';
import Input from './Input';

const Number = (props) => {
  const { restriction } = props;

  return <Input {...props} restriction={{ ...restriction, [FIELDS.number.restrictions.number]: true }} />;
};

export default Number;
