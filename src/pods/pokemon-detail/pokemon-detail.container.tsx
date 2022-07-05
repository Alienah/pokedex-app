import React from 'react';
import { usePokemonByNameQuery } from './api';
import { PokemonDetailComponent } from './pokemon-detail.component';

interface Props {
  pokemonName: string;
}

export const PokemonDetailContainer: React.FC<Props> = (props) => {
  const { pokemonName } = props;
  const { pokemon, loading, error } = usePokemonByNameQuery(pokemonName || '');

  return (
    <>
      <PokemonDetailComponent
        loading={loading}
        error={error}
        pokemon={pokemon}
      />
    </>
  );
};
