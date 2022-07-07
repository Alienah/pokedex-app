import React from 'react';
import { Pokemon } from './pokemon-list.vm';
import { ApolloError } from '@apollo/client';
import Button from '@mui/material/Button';
import { PokemonCardComponent } from 'common-app/components';
import { GridType, GRID_TYPES } from './components/grid-switch';
import { BoxItemComponent } from './components/box-item';

import './pokemon-list.component.scss';

interface Props {
  loading: boolean;
  error: ApolloError;
  gridType: GridType;
  pokemons: Pokemon[];
  totalCount: number;
  fetchMore: () => void;
}

export const PokemonListComponent: React.FC<Props> = (props) => {
  const { error, loading, gridType, pokemons, totalCount, fetchMore } = props;
  if (loading) return <div className="PokemonListComponent">'Loading...'</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div className={`PokemonListComponent ${gridType}`.trim()}>
      {pokemons.length > 0 ? (
        <>
          <ul className={`pokemon-list ${gridType}`.trim()}>
            {pokemons.map((pokemon) => (
              <li key={pokemon.id}>
                {gridType === GRID_TYPES.grid ? (
                  <PokemonCardComponent pokemon={pokemon} />
                ) : (
                  <BoxItemComponent pokemon={pokemon} />
                )}
              </li>
            ))}
          </ul>
          <div className="load-more__container">
            <Button
              className="load-button"
              variant="contained"
              onClick={() => {
                fetchMore();
              }}
              disabled={loading}
            >
              Load more
            </Button>
            <span>
              {pokemons.length} from {totalCount || 0}
            </span>
          </div>{' '}
        </>
      ) : (
        <div>No pokemons to show</div>
      )}
    </div>
  );
};
