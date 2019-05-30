import React from 'react';

import defaultImageUrl from '../../../images/todo.png';

import styles from './TodoList.css';

import FormGroup from '../Form/FormGroup.jsx';
import { TodoScheme } from '../../../dataSchemes';

export default (props) => {
  const todoHeaderClassName = ['card-header', styles.TodoHeader].join(' ');
  const todoBodyClassName = ['card-body', styles.TodoBody].join(' ');
  const todoTextClassName = ['card-text', styles.todoText].join(' ');
  const removeButtonClassName = [styles.editButton, 'redish'].join(' ');

  const checkboxId = 'todoCheckbox' + props.idx;
  const statuses = Object.keys(TodoScheme.status.values);
  const currentStatus =  props.status || TodoScheme.status.initialValue;
  const oppositeStatus = currentStatus == statuses[0] ? statuses[1] : statuses[0];
  const { text: labelText, classNames } = TodoScheme.status.values[props.status];
  const labelClassName = [ styles.statusLabel ].concat( classNames, styles.editControls ).join(' ');

  const editControls = (props.isAdmin) ? (
    <div className={styles.editControls}>
      <span onClick={() => props.onRemoveClick(props.id)} className={removeButtonClassName}>Remove</span>
      <span onClick={() => props.onEditClick(props.id)} className={ styles.editButton }>Edit</span>
      <FormGroup
        id={checkboxId}
        labelText={""}
        containerClassNames={ styles.checkboxContainer }
        value={currentStatus}
        { ...TodoScheme.status }
        onChange={() => props.onStatusSwitch(props.id, { status: oppositeStatus })}
      />
    </div>
  ) : <span className={labelClassName}>{labelText}</span>;

  const imageUrl = props.image || defaultImageUrl;

  return (
    <li key={props.idx} className={styles.TodoItem}>
      <div className="card">
        <div className={todoHeaderClassName}>
          #{props.id || props.idx}. { props.username } ({props.email})
        </div>
        <div className={todoBodyClassName}>
          <img src={imageUrl} alt={imageUrl} className={styles.cardImage} />
          <div className={todoTextClassName}>{props.text}</div>
          {editControls}
        </div>
      </div>
    </li>
  );
}
