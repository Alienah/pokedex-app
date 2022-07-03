import React from 'react';
import { usePokemonsQuery, usePokemonTypesQuery } from './api';
import { TextFieldComponent } from 'common/components';
import { TypeFilterComponent } from './components/type-filter.component';
import { PokemonListComponent } from './pokemon-list.component';

interface Filters {
  filter: { type: string };
  search: string;
}

const defaultFilters = {
  filter: null,
  search: '',
};

export const PokemonListContainer: React.FC = () => {
  const { pokemons, loading, error, fetchMore, totalCount, refetch } =
    usePokemonsQuery();
  const [filters, setFilters] = React.useState<Filters>(defaultFilters);
  const {
    pokemonTypes,
    loading: loadingTypes,
    error: errorInTypesQuery,
  } = usePokemonTypesQuery();

  const onFilterByType = (type: string): void => {
    const newTypeQueryFilter = { ...filters, filter: { type } };
    setFilters(newTypeQueryFilter);
    refetch({ pokemonsQueryInput: newTypeQueryFilter });
  };

  const onSearch = (text: string): void => {
    const newSearchQueryFilter = { ...filters, search: text };
    setFilters(newSearchQueryFilter);
    refetch({ pokemonsQueryInput: newSearchQueryFilter });
  };

  return (
    <>
      <TextFieldComponent label="Search" onChange={onSearch} />
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
