import {isArray, isEmpty} from "lodash";

import useValidator from "../hooks/useValidator";

const validate = (fields, type) => {
    const validator = useValidator();

    const errors = fields.map((field) => {
        const values = isArray(field.value)
            ? field.value || ''
            : [field.value || ''];

        const validators = field[type]
            ? Object.entries(field[type]).map(([fn, value]) => validator[fn](value))
            : []

        const error = values
            .map((value) => validator.validate(validators)(value))
            .filter((error) => error !== '')[0];

        return isEmpty(error) ? {} : {[field.name]: error}
    })

    return Object.assign({}, ...errors);
}

export default validate;