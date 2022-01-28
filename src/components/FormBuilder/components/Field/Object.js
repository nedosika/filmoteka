import React from 'react';

import Input from './Input';
import {isEmpty} from "lodash";

const ACTIONS = {
    add: "add",
    delete: "delete"
}

const ObjectInput = (props) => {
    const {
        name,
        error,
        label,
        value,
        onChange,
        validation,
        restriction,
    } = props;

    const values = isEmpty(value)
        ? [{key: '', value: ''}]
        : Object.entries(value).map(([key, value]) => ({key, value}));

    const handleChange = (index) => (field) => {
        const newValues = [
            ...values.slice(0, index),
            {
                ...values[index],
                [field.name]: field.value
            },
            ...values.slice(index + 1)
        ];

        const value = Object.assign({}, ...newValues.map(({key, value}) => ({[key]: value})));

        onChange({
            name,
            value,
            validation,
            restriction
        })
    };

    const handleButtonClick = (index) => (event) => {
        event.preventDefault();

        const {action} = event.target.dataset;

        if (action === ACTIONS.add)
            values.push({key: '', value: ''});

        if (action === ACTIONS.delete)
            values.splice(index, 1);

        const value = Object.assign({}, ...values.map(({key, value}) => ({[key]: value})));

        onChange({
            name,
            value,
            restriction,
            validation
        })
    }

    return (
        <div>
            <label>{label}
                {
                    values.map((element, index) => {
                        return (
                            <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                                <Input
                                    name='key'
                                    value={element.key}
                                    onChange={handleChange(index)}
                                />
                                <Input
                                    name='value'
                                    value={element.value}
                                    onChange={handleChange(index)}
                                />
                                {
                                    values.length - 1 === index &&
                                    <button data-action={ACTIONS.add}
                                            onClick={handleButtonClick(index)}>+</button>
                                }
                                {
                                    values.length > 1 &&
                                    <button data-action={ACTIONS.delete}
                                            onClick={handleButtonClick(index)}>-</button>
                                }
                            </div>
                        );
                    })
                }
            </label>
            {error && (<div style={{color: 'red'}}>{error}</div>)}
        </div>
    );
};

export default ObjectInput;