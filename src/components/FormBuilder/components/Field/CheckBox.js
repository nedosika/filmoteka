import React from 'react';

import Input from "./Input";

const CheckBox = (props) => {
    const {
        name,
        value,
        checked,
        onChange
    } = props;

    const handleChange = () => {
        onChange({
            name,
            value: value === undefined ? !checked : !value
        })
    };

    return (
        <div>
            <Input
                {...props}
                checked={value === undefined ? checked : value}
                onChange={handleChange}
            />
        </div>
    );
};

export default CheckBox;