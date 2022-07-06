import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from 'common/test';
import {
  PokemonCardComponent,
  PokemonCardComponentProps,
} from './pokemon-card.component';
import { Pokemon } from 'pods/pokemon-list/pokemon-list.vm';

jest.mock('pods/favorite-input', () => {
  const original = jest.requireActual('pods/favorite-input');
  return {
    ...original,
    FavoriteInputContainer: () => <div>FavoriteInputContainer</div>,
  };
});

describe('PokemonCardComponent specs', () => {
  it('should display an image with an accesible name', () => {
    const pokemonName = 'Bulbasaur';
    const pokemon: Partial<Pokemon> = {
      name: pokemonName,
      id: '001',
      isFavorite: false,
      types: ['Fire'],
    };
    const props: Partial<PokemonCardComponentProps> = {};

    renderWithRouter(
      <PokemonCardComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonCardComponentProps)}
      />
    );
    const image = screen.getByRole('img');

    expect(image).toHaveAccessibleName(`${pokemonName} image`);
  });
  it('should display the image inside a link by default', () => {
    const pokemonName = 'Bulbasaur';
    const pokemon: Partial<Pokemon> = {
      name: pokemonName,
      id: '001',
      isFavorite: false,
      types: ['Fire'],
    };
    const props: Partial<PokemonCardComponentProps> = {};

    renderWithRouter(
      <PokemonCardComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonCardComponentProps)}
      />
    );
    const link = screen.getByRole('link');
    const image = screen.getByRole('img');

    expect(link).toContainElement(image);
  });
  it('should NOT display the image inside a link if noLink prop is true', () => {
    const pokemonName = 'Bulbasaur';
    const pokemon: Partial<Pokemon> = {
      name: pokemonName,
      id: '001',
      isFavorite: false,
      types: ['Fire'],
    };
    const props: Partial<PokemonCardComponentProps> = {
      noLink: true,
    };

    renderWithRouter(
      <PokemonCardComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonCardComponentProps)}
      />
    );
    const link = screen.queryByRole('link');
    const image = screen.getByRole('img');

    expect(link).not.toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
  it('should include the link to the specified pokemon detail', () => {
    const pokemonName = 'Bulbasaur';
    const pokemon: Partial<Pokemon> = {
      name: pokemonName,
      id: '001',
      isFavorite: false,
      types: ['Fire'],
    };
    const props: Partial<PokemonCardComponentProps> = {};

    renderWithRouter(
      <PokemonCardComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonCardComponentProps)}
      />
    );
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', `/detail/${pokemonName}`);
  });
  it('should display the types by default with the default prop type value which is medium', () => {
    const pokemonTypes = ['Fire', 'Water'];
    const pokemon: Partial<Pokemon> = {
      name: 'Bulbasaur',
      id: '001',
      isFavorite: false,
      types: pokemonTypes,
    };
    const props: Partial<PokemonCardComponentProps> = {};

    renderWithRouter(
      <PokemonCardComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonCardComponentProps)}
      />
    );
    const list = screen.getByRole('list');

    expect(list).toHaveTextContent(pokemonTypes[0]);
    expect(list).toHaveTextContent(pokemonTypes[1]);
  });
  it('should NOT display the types when short type prop is provided', () => {
    const pokemonTypes = ['Fire', 'Water'];
    const pokemon: Partial<Pokemon> = {
      name: 'Bulbasaur',
      id: '001',
      isFavorite: false,
      types: pokemonTypes,
    };
    const props: Partial<PokemonCardComponentProps> = {
      type: 'short',
    };

    renderWithRouter(
      <PokemonCardComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonCardComponentProps)}
      />
    );
    const list = screen.queryByRole('list');

    expect(list).not.toBeInTheDocument();
  });
});
