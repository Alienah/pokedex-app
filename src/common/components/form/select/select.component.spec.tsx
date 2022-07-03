import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { SelectComponent } from './select.component';

describe('SelectComponent specs', () => {
  it('should display the label', () => {
    const props = {
      label: 'Types',
      onChange: () => {},
      options: [],
    };

    render(<SelectComponent {...props} />);
    const element = screen.getByText('Types');

    expect(element).not.toBeNull();
    expect(element.tagName).toEqual('LABEL');
  });

  it('should select the specified option', () => {
    const props = {
      label: 'Types',
      onChange: () => {},
      options: ['a', 'b', 'c'],
    };

    render(<SelectComponent {...props} />);
    const selectInput = screen.getByRole('button');
    fireEvent.mouseDown(selectInput);
    const optionB = within(screen.getAllByRole('option')[2]).getByText('b');
    fireEvent.click(optionB);

    expect(selectInput).toHaveTextContent('b');
    expect(selectInput).not.toHaveTextContent('a');
  });

  it('should send the selected value through onChange prop', () => {
    const props = {
      label: 'Types',
      onChange: jest.fn(),
      options: ['a', 'b', 'c'],
    };

    render(<SelectComponent {...props} />);
    const selectInput = screen.getByRole('button');
    fireEvent.mouseDown(selectInput);
    const optionB = within(screen.getAllByRole('option')[2]).getByText('b');
    fireEvent.click(optionB);

    expect(props.onChange).toHaveBeenCalledWith('b');
  });
});
