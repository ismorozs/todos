import React from 'react';

import styles from './TodoList.css';
import TodoItem from './TodoItem.jsx';

export default (props) => {
  const items = props.list.map((item, i) =>
    <TodoItem
      {...item}
      idx={i}
      key={i}
      onStatusSwitch={props.onStatusSwitch}
      onEditClick={props.onEditClick}
      onRemoveClick={props.onRemoveClick}
      isAdmin={props.isAdmin}
    />
  );
  
  return <ul className={styles.TodoList}>{items}</ul>;
}
