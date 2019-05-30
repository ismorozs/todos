import React from 'react';

export default (props) => {
  if (!props.list || !props.list.length) {
    return null;
  }

  const errorsEls = props.list.map((err, i) => <li key={i} className="redish">{err}</li>);

  return (
    <ul className={props.className}>
      {errorsEls}
    </ul>
  );
}
