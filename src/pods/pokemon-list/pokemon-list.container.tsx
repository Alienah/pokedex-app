import React from 'react';
import {
  PokemonFilterInput,
  usePokemonsQuery,
  usePokemonTypesQuery,
} from './api';
import { TextFieldComponent, TabsComponent, TabInfo } from 'common/components';
import { TypeFilterComponent } from './components/type-filter.component';
import { PokemonListComponent } from './pokemon-list.component';

interface QueryFilters {
  filter: PokemonFilterInput;
  search: string;
}

const defaultQueryFilters = {
  filter: null,
  search: '',
};
const ALL = 'ALL';
const FAV = 'FAVORITES';

export const PokemonListContainer: React.FC = () => {
  const [queryFilters, setQueryFilters] =
    React.useState<QueryFilters>(defaultQueryFilters);
  const { pokemons, loading, error, fetchMore, totalCount, refetch } =
    usePokemonsQuery();
  const {
    pokemonTypes,
    loading: loadingTypes,
    error: errorInTypesQuery,
  } = usePokemonTypesQuery();

  const onFilterByType = (type: string): void => {
    const inputFilter = queryFilters.filter;
    const newTypeQueryFilter = {
      ...queryFilters,
      filter: { ...inputFilter, type },
    };
    setQueryFilters(newTypeQueryFilter);
    refetch({ pokemonsQueryInput: newTypeQueryFilter });
  };

  const onSearch = (text: string): void => {
    const newSearchQueryFilter = { ...queryFilters, search: text };
    setQueryFilters(newSearchQueryFilter);
    refetch({ pokemonsQueryInput: newSearchQueryFilter });
  };

  const onTabSelected = (label: string): void => {
    const isFavoritesTab = label === FAV;
    const inputFilter = queryFilters.filter;
    const newTypeQueryFilter = {
      ...queryFilters,
      filter: { ...inputFilter, isFavorite: isFavoritesTab || null },
    };
    setQueryFilters(newTypeQueryFilter);
    refetch({ pokemonsQueryInput: newTypeQueryFilter });
  };

  const buildTabOptions = (): TabInfo[] => {
    const content = (
      <PokemonListComponent
        loading={loading}
        error={error}
        pokemons={pokemons}
        totalCount={totalCount}
        fetchMore={fetchMore}
      />
    );
    return [
      {
        label: ALL,
        content,
      },
      {
        label: FAV,
        content,
      },
    ];
  };

  const tabContentHeader = (
    <>
      <TextFieldComponent label="Search" onChange={onSearch} />
      <TypeFilterComponent
        onFilterByType={onFilterByType}
        types={pokemonTypes}
        loading={loadingTypes}
        error={errorInTypesQuery}
      />
    </>
  );

  return (
    <>
      <TabsComponent
        header={tabContentHeader}
        onChange={onTabSelected}
        options={buildTabOptions()}
      />
    </>
  );
};
