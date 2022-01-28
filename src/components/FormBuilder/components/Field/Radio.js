import React from 'react';

import Input from "./Input";

const Radio = (props) => {
    const {
        value: checkedValue,
        values,
        onChange,
        name
    } = props;

    const handleChange = (field) => {
        onChange({
            name,
            value: field.value
        })
    }

    return (
        <div>
            {
                values.map(({label, value, checked}) =>
                    <Input
                        {...props}
                        key={value}
                        value={value}
                        label={label}
                        checked={checkedValue ? checkedValue === value : checked}
                        onChange={handleChange}
                    />
                )
            }
        </div>
    );
}

export default Radio;