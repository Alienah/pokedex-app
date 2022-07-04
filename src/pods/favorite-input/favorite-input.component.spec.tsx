import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteInputComponent } from './favorite-input.component';

describe('FavoriteInputComponent specs', () => {
  it('should display a filled button when isFavorite prop is true', () => {
    const props = {
      isFavorite: true,
      onChange: () => {},
    };

    render(<FavoriteInputComponent {...props} />);

    expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument();
    expect(screen.getByTestId('filled-button')).toBeInTheDocument();
    expect(screen.queryByTestId('border-button')).not.toBeInTheDocument();
  });

  it('should display a button with border no filled when isFavorite prop is false', () => {
    const props = {
      isFavorite: false,
      onChange: () => {},
    };

    render(<FavoriteInputComponent {...props} />);

    expect(screen.getByRole('button', { pressed: false })).toBeInTheDocument();
    expect(screen.queryByTestId('filled-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('border-button')).toBeInTheDocument();
  });

  it('should change the button to filled when click to favorite', () => {
    const props = {
      isFavorite: false,
      onChange: () => {},
    };

    render(<FavoriteInputComponent {...props} />);
    const favButton = screen.getByRole('button', { pressed: false });
    fireEvent.click(favButton);

    expect(screen.getByTestId('filled-button')).toBeInTheDocument();
    expect(screen.queryByTestId('border-button')).not.toBeInTheDocument();
  });

  it('should send the value of isFavorite through onChange event when click to fav', () => {
    const props = {
      isFavorite: false,
      onChange: jest.fn(),
    };

    render(<FavoriteInputComponent {...props} />);
    const favButton = screen.getByRole('button', { pressed: false });
    fireEvent.click(favButton);

    expect(props.onChange).toHaveBeenCalledWith(true);

    fireEvent.click(favButton);

    expect(props.onChange).toHaveBeenCalledWith(false);
  });
});
