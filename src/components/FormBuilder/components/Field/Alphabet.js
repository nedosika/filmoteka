import React from 'react';

import Input from "./Input";
import {FIELDS} from "../../index";

const Alphabet = (props) => {
    const {restriction} = props;

    return (
        <Input
            {...props}
            restriction={{...restriction, [FIELDS.alphabet.restrictions.alphabet]: true}}
        />
    );
}

export default Alphabet;