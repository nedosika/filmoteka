import React from 'react';
import {omit} from "lodash";

const Input = (props) => {
    const {
        error,
        label,
        onChange,
        validation,
        restriction,
        value = ''
    } = props;

    const handleChange = ({target: {name, value}}) => {
        onChange({
            name,
            value,
            validation,
            restriction
        });
    };

    return (
        <div>
            <label>{label}
                <input
                    {...omit(props, ['restriction', 'validation', 'initialValue', 'values'])}
                    value={value}
                    onChange={handleChange}
                />
                {error && (<div style={{color: 'red'}}>{error}</div>)}
            </label>
        </div>
    );
};

export default Input;