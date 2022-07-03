import React from 'react';
import { render, screen } from '@testing-library/react';
import { TypeFilterComponent } from './type-filter.component';
import { ApolloError } from '@apollo/client';

describe('TypeFilterComponent specs', () => {
  it('should display a skeleton when is loading', () => {
    const props = {
      error: null,
      loading: true,
      onFilterByType: () => {},
      types: ['a', 'b'],
    };

    render(<TypeFilterComponent {...props} />);
    const skeleton = screen.getByTestId('skeleton');
    const selectComponent = screen.queryByTestId('select-component');

    expect(skeleton).toBeInTheDocument();
    expect(selectComponent).toBeNull();
  });

  it('should display a select component', () => {
    const props = {
      error: null,
      loading: false,
      onFilterByType: () => {},
      types: ['a', 'b'],
    };

    render(<TypeFilterComponent {...props} />);
    const skeleton = screen.queryByTestId('skeleton');
    const selectComponent = screen.getByTestId('select-component');

    expect(skeleton).toBeNull();
    expect(selectComponent).toBeInTheDocument();
  });

  it('should display an error message when an error is given', () => {
    const originalWarn = console.warn;
    console.warn = jest.fn();
    const props = {
      error: { message: 'This is an error' } as ApolloError,
      loading: false,
      onFilterByType: () => {},
      types: ['a', 'b'],
    };

    render(<TypeFilterComponent {...props} />);
    const errorElement = screen.getByText('Type filter is not available');
    const selectComponent = screen.queryByTestId('select-component');

    expect(selectComponent).toBeNull();
    expect(errorElement).toBeInTheDocument();
    expect(console.warn).toBeCalledWith('Error! This is an error');

    console.warn = originalWarn;
  });
});
