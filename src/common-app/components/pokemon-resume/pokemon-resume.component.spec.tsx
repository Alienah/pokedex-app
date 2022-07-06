import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  PokemonResumeComponent,
  PokemonResumeComponentProps,
} from './pokemon-resume.component';
import { Pokemon } from 'pods/pokemon-list/pokemon-list.vm';

jest.mock('pods/favorite-input', () => {
  const original = jest.requireActual('pods/favorite-input');
  return {
    ...original,
    FavoriteInputContainer: () => <div>FavoriteInputContainer</div>,
  };
});

describe('PokemonResumeComponent specs', () => {
  it('should display PokemonResumeComponent using as the title the name provided', () => {
    const pokemonName = 'Bulbasaur';
    const pokemon: Partial<Pokemon> = {
      name: pokemonName,
      id: '001',
      isFavorite: false,
      types: ['Fire'],
    };
    const props: Partial<PokemonResumeComponentProps> = {};

    render(
      <PokemonResumeComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonResumeComponentProps)}
      />
    );
    const title = screen.getByRole('heading', { level: 2 });

    expect(title).toHaveTextContent(pokemonName);
  });
  it('should display the pokemon type in a span if only one type is provided', () => {
    const pokemonTypes = ['Fire'];
    const pokemon: Partial<Pokemon> = {
      name: 'Bulbasaur',
      id: '001',
      isFavorite: false,
      types: pokemonTypes,
    };
    const props: Partial<PokemonResumeComponentProps> = {};

    render(
      <PokemonResumeComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonResumeComponentProps)}
      />
    );
    const span = screen.getByTestId('type-alone');
    const list = screen.queryByRole('list');

    expect(span).toHaveTextContent(pokemonTypes[0]);
    expect(list).not.toBeInTheDocument();
  });
  it('should display the pokemon types in a list when more than one type are provided', () => {
    const pokemonTypes = ['Fire', 'Water'];
    const pokemon: Partial<Pokemon> = {
      name: 'Bulbasaur',
      id: '001',
      isFavorite: false,
      types: pokemonTypes,
    };
    const props: Partial<PokemonResumeComponentProps> = {};

    render(
      <PokemonResumeComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonResumeComponentProps)}
      />
    );
    const span = screen.queryByTestId('type-alone');
    const list = screen.getByRole('list');

    expect(span).not.toBeInTheDocument();
    expect(list).toHaveTextContent(pokemonTypes[0]);
    expect(list).toHaveTextContent(pokemonTypes[1]);
  });
  it('should NOT display the pokemon types when no types are provided', () => {
    const pokemonTypes = [];
    const pokemon: Partial<Pokemon> = {
      name: 'Bulbasaur',
      id: '001',
      isFavorite: false,
      types: pokemonTypes,
    };
    const props: Partial<PokemonResumeComponentProps> = {};

    render(
      <PokemonResumeComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonResumeComponentProps)}
      />
    );
    const span = screen.queryByTestId('type-alone');
    const list = screen.queryByRole('list');

    expect(span).not.toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
  });
  it('should NOT display the pokemon types when showTypes is false', () => {
    const pokemon: Partial<Pokemon> = {
      name: 'Bulbasaur',
      id: '001',
      isFavorite: false,
      types: ['Fire', 'Water'],
    };
    const props: Partial<PokemonResumeComponentProps> = {
      showTypes: false,
    };

    render(
      <PokemonResumeComponent
        pokemon={pokemon as Pokemon}
        {...(props as PokemonResumeComponentProps)}
      />
    );
    const span = screen.queryByTestId('type-alone');
    const list = screen.queryByRole('list');

    expect(span).not.toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
  });
});
