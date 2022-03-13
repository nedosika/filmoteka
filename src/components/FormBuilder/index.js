export { default } from './FormBuilder';

export const VALIDATORS = {
  max: 'max',
  min: 'min',
  email: 'email',
  number: 'number',
  pattern: 'pattern',
  required: 'required',
  alphabet: 'alphabet',
  minLength: 'minLength',
  maxLength: 'maxLength',
};

export const VALIDATION_TYPES = {
  validation: 'validation',
  restriction: 'restriction',
};

export const PROPS = {
  name: 'name',
  type: 'type',
  label: 'label',
  required: 'required',
  placeholder: 'placeholder',
  initialValue: 'initialValue',
};

export const FIELDS = {
  text: {
    type: 'Text',
    props: {
      name: PROPS.name,
      type: PROPS.type,
      label: PROPS.label,
      required: PROPS.required,
      placeholder: PROPS.placeholder,
      initialValue: PROPS.initialValue,
    },
    validators: {
      minLength: VALIDATORS.minLength,
      maxLength: VALIDATORS.maxLength,
      required: VALIDATORS.required,
      pattern: VALIDATORS.pattern,
    },
    restrictions: {
      maxLength: VALIDATORS.maxLength,
      pattern: VALIDATORS.pattern,
    },
  },
  password: {
    type: 'Password',
    validators: {
      minLength: VALIDATORS.minLength,
      maxLength: VALIDATORS.maxLength,
      required: VALIDATORS.required,
      pattern: VALIDATORS.pattern,
    },
    restrictions: {
      maxLength: VALIDATORS.maxLength,
      pattern: VALIDATORS.pattern,
    },
  },
  alphabet: {
    type: 'Alphabet',
    validators: {
      minLength: VALIDATORS.minLength,
      maxLength: VALIDATORS.maxLength,
      required: VALIDATORS.required,
      pattern: VALIDATORS.pattern,
    },
    restrictions: {
      maxLength: VALIDATORS.maxLength,
      alphabet: VALIDATORS.alphabet,
      pattern: VALIDATORS.pattern,
    },
  },
  select: {
    type: 'Select',
    validators: {
      required: VALIDATORS.required,
    },
  },
  number: {
    type: 'Number',
    validators: {
      required: VALIDATORS.required,
      pattern: VALIDATORS.pattern,
      min: VALIDATORS.min,
      max: VALIDATORS.max,
    },
    restrictions: {
      maxLength: VALIDATORS.maxLength,
      pattern: VALIDATORS.pattern,
      number: VALIDATORS.number,
    },
  },
  email: {
    type: 'Email',
    validators: {
      required: VALIDATORS.required,
      pattern: VALIDATORS.pattern,
      email: VALIDATORS.email,
    },
    restrictions: {
      maxLength: VALIDATORS.maxLength,
      pattern: VALIDATORS.pattern,
    },
  },
  textarea: {
    type: 'TextArea',
    validators: {
      required: VALIDATORS.required,
      alphabet: VALIDATORS.alphabet,
      pattern: VALIDATORS.pattern,
    },
    restrictions: {
      maxLength: VALIDATORS.maxLength,
      alphabet: VALIDATORS.alphabet,
      pattern: VALIDATORS.pattern,
    },
  },
  object: {
    type: 'Object',
    props: {
      type: PROPS.type,
      name: PROPS.name,
      title: PROPS.label,
    },
  },
  array: {
    type: 'Array',
    validators: {
      alphabet: VALIDATORS.alphabet,
    },
  },
  radio: {
    type: 'Radio',
  },
  checkbox: {
    type: 'CheckBox',
  },
};
