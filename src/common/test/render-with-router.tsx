import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

export const renderWithRouter = (component: ReactElement) => {
  return {
    ...render(<Router>{component}</Router>),
  };
};
