import React from 'react';
import { Pokemon } from './pokemon-list.vm';
import { ApolloError } from '@apollo/client';

interface Props {
  loading: boolean;
  error: ApolloError;
  pokemons: Pokemon[];
  totalCount: number;
  fetchMore: () => void;
}

export const PokemonListComponent: React.FC<Props> = (props) => {
  const { error, loading, pokemons, totalCount, fetchMore } = props;
  if (loading) return <div>'Loading...'</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div>
      <div>Total: {totalCount || 0}</div>
      <ul>
        {pokemons.length > 0 &&
          pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <div style={{ height: '150px' }}>
                <p>{pokemon.name}</p>
                <p>{pokemon.id}</p>
                {pokemon.types.length > 0 && (
                  <ul>
                    {pokemon.types.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          fetchMore();
        }}
      >
        Load more
      </button>
    </div>
  );
};
