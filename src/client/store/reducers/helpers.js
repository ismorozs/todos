export const fillStateForm = (form, values = {}) => {
  for (let key in form.fields) {
    const value = typeof values[key] === 'undefined' ? '' : values[key];
    form.fields[key].value = value;
  }
}
