import React from 'react';
import './styles.scss';

export const App = ({ name = '' }) => {
  return (
    <div className="app">
      <h1 className="my-text">Hello React !!</h1>
      {name && <div className="welcome">Welcome {name}</div>}
    </div>
  );
};
