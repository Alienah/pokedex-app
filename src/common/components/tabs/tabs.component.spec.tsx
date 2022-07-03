import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabsComponent } from './tabs.component';

describe('TabsComponent specs', () => {
  it('should display a tab:', () => {
    const props = {
      options: [
        {
          label: 'First',
          content: <div>First Content</div>,
        },
        {
          label: 'Second',
          content: <div>Second content</div>,
        },
      ],
      onChange: () => {},
    };

    render(<TabsComponent {...props} />);

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(
      'First'
    );
    expect(screen.getByText('First Content')).toBeInTheDocument();
    expect(screen.queryByText('Second content')).not.toBeInTheDocument();
  });

  it('should change the content when the tab changes', () => {
    const FIRST_LABEL = 'First';
    const FIRST_CONTENT = 'First Content';
    const SECOND_LABEL = 'Second';
    const SECOND_CONTENT = 'Second content';
    const props = {
      options: [
        {
          label: FIRST_LABEL,
          content: <div>{FIRST_CONTENT}</div>,
        },
        {
          label: SECOND_LABEL,
          content: <div>{SECOND_CONTENT}</div>,
        },
      ],
      onChange: () => {},
    };

    render(<TabsComponent {...props} />);
    const tab1 = screen.getByRole('tab', { name: FIRST_LABEL });
    fireEvent.click(tab1);

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(
      FIRST_LABEL
    );
    expect(screen.getByText(FIRST_CONTENT)).toBeInTheDocument();
    expect(screen.queryByText(SECOND_CONTENT)).not.toBeInTheDocument();

    const tab2 = screen.getByRole('tab', { name: SECOND_LABEL });
    fireEvent.click(tab2);

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(
      SECOND_LABEL
    );
    expect(screen.queryByText(FIRST_CONTENT)).not.toBeInTheDocument();
    expect(screen.getByText(SECOND_CONTENT)).toBeInTheDocument();
  });

  it('should send the value of label selected through onChange prop', () => {
    const FIRST_LABEL = 'First';
    const SECOND_LABEL = 'Second';
    const expectedOnchangeOutput = 'SECOND';
    const props = {
      onChange: jest.fn(),
      options: [
        {
          label: FIRST_LABEL,
          content: <div>First Content</div>,
        },
        {
          label: SECOND_LABEL,
          content: <div>Second content</div>,
        },
      ],
    };

    render(<TabsComponent {...props} />);
    const tab2 = screen.getByRole('tab', { name: SECOND_LABEL });
    fireEvent.click(tab2);

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(
      SECOND_LABEL
    );

    expect(props.onChange).toHaveBeenCalledWith(expectedOnchangeOutput);
  });
});
