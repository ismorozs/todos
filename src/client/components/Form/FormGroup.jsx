import React from 'react';

import ValidationErrors from './ValidationErrors.jsx';
import FormControl from './FormControl.jsx';

export default (props) => {
  let initialInputClass = 'form-control';

  if (['radio', 'checkbox'].includes(props.type)) {
    initialInputClass = 'form-check-input';
  }

  const fieldContainerClassName = ['form-group'].concat(props.containerClassNames).join(' ');
  const inputClassName = [initialInputClass].concat(props.classNames).join(' ');
  const labelClassName = ['col-form-label'].concat(props.labelClassNames).join(' ');
  const validationErrorsClassName = [''].concat(props.validationErrorsClassNames).join(' ');

  return (
    <div key={props.id} className={fieldContainerClassName}>
      <label htmlFor={props.id} className={labelClassName}>{props.labelText}</label>
      <ValidationErrors list={props.errors} className={validationErrorsClassName} />
      <FormControl {...props} className={inputClassName} />
    </div>
  );
}
