import React from 'react';
import { FIELDS } from '../../index';
import Input from './Input';

const Alphabet = (props) => {
  const { restriction } = props;

  return <Input {...props} restriction={{ ...restriction, [FIELDS.alphabet.restrictions.alphabet]: true }} />;
};

export default Alphabet;
