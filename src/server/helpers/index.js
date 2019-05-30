const { getPropsThroughKey } = require('../../helpers/index');
const statuses = require('../../constants/statuses').default;
const { checkValidation } = require('../../helpers/validation');

module.exports = {
  parseArgs,
  validateFields
};

function parseArgs (rawArgs) {
  const argsObj = {};

  for (let i = 2; i < rawArgs.length; i++) {
    const rawArg = rawArgs.argv[i];

    const argParts = rawArg.split('=');

    argsObj[ argParts[0] ] = argParts[1] || true;
  } 
  
  return argsObj;
}

function validateFields (fields, scheme, edit) {
  const res = checkValidation(fields, scheme, edit);

  if (res.isValid) {
    return getPropsThroughKey(res.fields, 'value');
  }

  const error = new Error(statuses.VALIDATION_ERROR);
  error.details = res.fields;
  throw error;
}
