import React from 'react';
import FileInput from './FileInput.jsx';
import CheckboxInput from './CheckboxInput.jsx';

function prepareOnChange (fieldName, onChange) {
  return (e) => onChange({ [fieldName]: { value: e.target.value }}) 
}

export default (props) => {

  switch (props.type) {
    case 'textarea':
      return (
        <textarea
          id={props.id}
          type={props.type}
          value={props.value}
          className={props.className}
          placeholder={props.placeholder}
          onChange={prepareOnChange(props.fieldName, props.onChange)}>
        </textarea>
      );

    case 'file':
      return <FileInput {...props} />;

    case 'checkbox':
      return <CheckboxInput {...props} />;

    default:
      return (
        <input
          id={props.id}
          type={props.type}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
          className={props.className}
          placeholder={props.placeholder}
          onChange={prepareOnChange(props.fieldName, props.onChange)}
        />
      );
  }
}
