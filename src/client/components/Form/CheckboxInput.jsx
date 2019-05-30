import React from 'react';

import styles from './Form.css';

export default (props) => {
  const values = Object.keys(props.values);
  const currentValue =  props.value || props.initialValue;
  const oppositeValue = currentValue == values[0] ? values[1] : values[0];

  const { checked, text, classNames } = props.values[currentValue];

  const labelClassName = [styles.checkboxLabel].concat(classNames).join(' ');
  const inputClassName = props.className + ' ' + styles.checkbox;

  const onClick = () => props.onChange({ [props.fieldName]: { value: oppositeValue }});

  return (
    <div>
      <span className={labelClassName} onClick={onClick}>{text}</span>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        checked={checked}
        onChange={onClick}
        className={inputClassName}
        placeholder={props.placeholder}
      />
    </div>
  );
}
