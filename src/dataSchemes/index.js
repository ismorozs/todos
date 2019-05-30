export const prepareFormFields = (scheme) => {
  const formFields = {};

  for (let key in scheme) {
    const value = typeof scheme[key].initialValue === 'undefined' ? '' : scheme[key].initialValue;
    formFields[key] = { value, errors: [] };
  }

  return formFields;
}

export { TodoScheme } from './Todo';
export { UserScheme } from './User';
