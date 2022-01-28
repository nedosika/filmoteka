import React from 'react';

import Input from "./Input";
import {FIELDS} from "../../index";

const Number = (props) => {
    const {restriction} = props;

    return (
        <Input {...props} restriction={{...restriction, [FIELDS.number.restrictions.number]: true}}/>
    );
};

export default Number;