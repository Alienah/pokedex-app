import React from 'react';
import { RouterComponent } from 'core';

import './global-styles/styles.scss';
import './app.scss';

export const App = () => {
  return (
    <div className="app">
      <h1 className="header">Pokedex</h1>
      <RouterComponent />
    </div>
  );
};
