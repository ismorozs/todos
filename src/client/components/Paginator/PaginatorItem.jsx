import React from 'react';

import styles from './Paginator.css';

export default (props) => {
  const containerClassNames = ['page-item'];
  const linkClassNames = ['page-link', styles.pageNumLink];

  if (props.active) {
    containerClassNames.push('active');
  }

  if (props.disabled) {
    containerClassNames.push('disabled');
  }

  return (
    <li className={containerClassNames.join(' ')}>
      <span className={linkClassNames.join(' ')} onClick={() => props.onClick({ pageNum: props.pageNum })}>{props.text}</span>
    </li>
  );
}
