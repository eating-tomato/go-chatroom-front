import React from 'react';

import './prepare.css';

export function PrepareView() {
  return <>
    <Seat />
  </>;
}

function Seat() {
  const [seat, setSeat] = React.useState<string[]>(new Array(8));

  function handleClick(idx:number) {

  }

  return <> {
    seat.map((user, idx) => (
      <div styleName="seat" key={user}
        onClick={handleClick.bind(null, idx)}
      >{ user }</div>
    ))
  }</>
}