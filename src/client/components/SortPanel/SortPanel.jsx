import React from 'react';

import styles from './SortPanel.css';

export default (props) => {
  const sortItems = [];

  for (let sortField in props.sortTypes) {
    const currentDirection = props.sortTypes[sortField];
    const newDirection = (currentDirection === 'asc') ? 'desc' : 'asc';

    const sortItemClassNames = [ styles.sortItem ];

    if (props.activeSortKey === sortField) {
      sortItemClassNames.push(styles.active, styles['sortItem' + currentDirection]);
    }

    sortItems.push(
      <li
        className={sortItemClassNames.join(' ')}
        onClick={() => props.onClick({ sortField, sortDirection: newDirection })}
        key={sortField}
      >
        {sortField}
      </li>
    )
  }

  return (
    <div className={ styles.SortPanel }>
      Sort by:
      <ul className={ styles.sortList }>{sortItems}</ul>
    </div>
  );
}
