import {VALIDATORS} from "../index";

const maxLength = (maxLength, message = 'Too long') => (value) =>
    value.length > maxLength && message

const minLength = (minLength, message = 'Too short') => (value) =>
    value.length < minLength && message

const max = (max, message = 'Too big') => (value) =>
    value > max && message

const min = (min, message = 'Too small') => (value) =>
    value < min && message

const alphabet = (isAlphabet, message = 'Should be an alphabet') => (value) =>
    isAlphabet && !/^[a-zа-я]*$/i.test(value) && message

const required = (isRequired, message = 'Should be required') => (value) =>
    isRequired && value.length === 0 && message

const email = (isEmail, message = 'Email is wrong') => (value) =>
    isEmail && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$|^$/.test(value) && message

const number = (isNumber, message = 'Should be a number') => (value) =>
    isNumber && /\D/.test(value) && message

const pattern = (pattern, message = 'Error') => (value) =>
    pattern.test(value) && message

const validate = (validators) => (value) => {
    let errorMessage = '';

    const result = validators
        .map((validator) => {
            const result = validator(value);
            return typeof result === 'string' ? result : '';
        })
        .filter(message => message !== '');

    if (result.length)
        errorMessage = result[0];

    return errorMessage;
}

export default function(){
    return {
        validate,
        [VALIDATORS.max]: max,
        [VALIDATORS.min]: min,
        [VALIDATORS.email]: email,
        [VALIDATORS.number]: number,
        [VALIDATORS.pattern]: pattern,
        [VALIDATORS.required]: required,
        [VALIDATORS.alphabet]: alphabet,
        [VALIDATORS.minLength]: minLength,
        [VALIDATORS.maxLength]: maxLength,
    }
};