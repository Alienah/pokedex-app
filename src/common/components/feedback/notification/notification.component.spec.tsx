import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationComponent, AlertType } from './notification.component';

describe('NotificationComponent specs', () => {
  it('should display the alert with the type specified', () => {
    const message = 'This is the message';
    const props = {
      open: true,
      type: 'info' as AlertType,
      content: message,
      onClose: () => {},
    };

    render(<NotificationComponent {...props} />);
    const alert = screen.getByRole('alert');

    expect(alert.classList).toContain('info-alert');
  });
  it('should display the alert with the message specified', () => {
    const message = 'This is the message';
    const props = {
      open: true,
      type: 'info' as AlertType,
      content: message,
      onClose: () => {},
    };

    render(<NotificationComponent {...props} />);
    const alert = screen.getByRole('alert');

    expect(alert).toHaveTextContent(message);
  });
  it('should call onClose when click to close', () => {
    const message = 'This is the message';
    const props = {
      open: true,
      type: 'info' as AlertType,
      content: message,
      onClose: jest.fn(),
    };

    render(<NotificationComponent {...props} />);
    const button = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(button);

    expect(props.onClose).toHaveBeenCalled();
  });
});
