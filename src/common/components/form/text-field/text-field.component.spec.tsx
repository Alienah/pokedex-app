import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent specs', () => {
  it('should display the label', () => {
    const props = {
      label: 'Search',
      onChange: () => {},
    };

    render(<TextFieldComponent {...props} />);
    const element = screen.getByText('Search');

    expect(element).not.toBeNull();
    expect(element.tagName).toEqual('LABEL');
  });

  it('should change the value', () => {
    const props = {
      label: 'Search',
      onChange: () => {},
      options: ['a', 'b', 'c'],
    };
    const newInputValue = 'my value';

    render(<TextFieldComponent {...props} />);
    const textInput = screen.getByRole('textbox');
    fireEvent.change(textInput, { target: { value: newInputValue } });

    expect(textInput).toHaveValue(newInputValue);
  });

  it('should send the value through onChange prop', () => {
    const props = {
      label: 'Types',
      onChange: jest.fn(),
    };
    const newInputValue = 'my value';

    render(<TextFieldComponent {...props} />);
    const textInput = screen.getByRole('textbox');
    fireEvent.change(textInput, { target: { value: newInputValue } });

    expect(props.onChange).toHaveBeenCalledWith(newInputValue);
  });
});
