const EMAIL_REGEXP = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const isRequired = (val) => {
  switch (typeof val) {
    case 'string':
      return val.length > 0;
  }
}

export const isEmail = (val) => EMAIL_REGEXP.test(val);

const validationOptions = {
  isRequired: { isValid: isRequired, error: 'Field is required' },
  isEmail: { isValid: isEmail, error: 'Email is not valid' },
};

export const validate = (value, validations = []) => {
  const errors = [];

  if (!validations.includes('isRequired') && !value) {
    return { isValid: true, errors, value };
  }
  
  validations.forEach((validation) => {
    const validationOption = validationOptions[validation] || validation;
    
    if ( validationOption.isValid(value) ) {
      return;
    }

    errors.push(validationOption.error);
  });

  const isValid = !errors.length;
  return { isValid, errors, value };
};

export const checkValidation = (fields, options, edit) => {
  let isFormValid = true;
  const validationResults = { isValid: false, fields: {} };

  for (let key in options) {

    if (edit && (typeof fields[key] === 'undefined')) {
      continue;
    }

    const fieldValue = fields[key];
    const validateOptions = options[key].validation;
    const validationResult = validate( fieldValue, validateOptions );

    validationResults.fields[key] = validationResult;

    isFormValid = isFormValid && validationResult.isValid;
  }

  validationResults.isValid = isFormValid;
  return validationResults;
}

export default checkValidation;
