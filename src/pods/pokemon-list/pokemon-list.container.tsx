import React from 'react';
import { usePokemonsQuery, usePokemonTypesQuery } from './api';
import { TypeFilterComponent } from './components/type-filter.component';
import { PokemonListComponent } from './pokemon-list.component';

export const PokemonListContainer: React.FC = () => {
  const { pokemons, loading, error, fetchMore, totalCount, refetch } =
    usePokemonsQuery();
  const {
    pokemonTypes,
    loading: loadingTypes,
    error: errorInTypesQuery,
  } = usePokemonTypesQuery();

  const onFilterByType = (type: string) => {
    refetch({ pokemonsQueryInput: { filter: { type } } });
  };

  return (
    <>
      <TypeFilterComponent
        onFilterByType={onFilterByType}
        types={pokemonTypes}
        loading={loadingTypes}
        error={errorInTypesQuery}
      />
      <PokemonListComponent
        loading={loading}
        error={error}
        pokemons={pokemons}
        totalCount={totalCount}
        fetchMore={fetchMore}
      />
    </>
  );
};
