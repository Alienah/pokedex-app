import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './app';

describe('Dummy specs', () => {
  it('should pass spec', () => {
    // Arrange

    // Act

    // Assert
    expect(true).toBeTruthy();
  });
});

describe('App component specs', () => {
  it('should display the name', () => {
    // Arrange
    const name = 'John';

    // Act
    render(<App name={name} />);

    // Assert
    const element = screen.getByText('Welcome John');
    expect(element).not.toBeNull();
    expect(element.tagName).toEqual('DIV');
  });

  it('should display the name with jest-dom asserts', () => {
    // Arrange
    const name = 'John';

    // Act
    render(<App name={name} />);

    // Assert
    const element = screen.getByText('Welcome John');
    expect(element).toBeInTheDocument();
  });

  it('should display the name using snapshot testing', () => {
    // Arrange
    const name = 'John';

    // Act
    const { asFragment } = render(<App name={name} />);

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });
});
