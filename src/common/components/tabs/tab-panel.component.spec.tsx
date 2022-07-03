import React from 'react';
import { render, screen } from '@testing-library/react';
import { TabPanel } from './tab-panel.component';

describe('TabPanel specs', () => {
  it('should display the panel when value and index are the same', () => {
    const props = {
      index: 0,
      value: 0,
    };

    render(<TabPanel {...props}>The children index 0</TabPanel>);
    const children = screen.getByText('The children index 0');

    expect(children).toBeInTheDocument();
  });

  it('should NOT display the panel when value and index are NOT the same', () => {
    const props = {
      index: 0,
      value: 1,
    };

    render(<TabPanel {...props}>The children index 0</TabPanel>);
    const children = screen.queryByText('The children index 0');

    expect(children).not.toBeInTheDocument();
  });
});
