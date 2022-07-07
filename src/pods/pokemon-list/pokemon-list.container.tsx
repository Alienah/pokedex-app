import React from 'react';
import {
  PokemonFilterInput,
  usePokemonsQuery,
  usePokemonTypesQuery,
} from './api';
import { TextFieldComponent, TabsComponent, TabInfo } from 'common/components';
import { TypeFilterComponent } from './components/type-filter';
import { PokemonListComponent } from './pokemon-list.component';
import {
  GridSwitchComponent,
  GridType,
  GRID_TYPES,
} from './components/grid-switch';

import './pokemon-list.container.scss';

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
  const [gridType, setGridType] = React.useState<GridType>(GRID_TYPES.grid);
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
        gridType={gridType}
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
    <div className="tab-content-header">
      <TextFieldComponent
        className="search-field"
        label="Search"
        onChange={onSearch}
      />
      <TypeFilterComponent
        onFilterByType={onFilterByType}
        types={pokemonTypes}
        loading={loadingTypes}
        error={errorInTypesQuery}
      />
      <GridSwitchComponent onChange={setGridType} />
    </div>
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
