import React from 'react';
import { ApolloError } from '@apollo/client';
import { Pokemon } from './api';

interface Props {
  loading: boolean;
  error: ApolloError;
  pokemon: Pokemon;
}

export const PokemonDetailComponent: React.FC<Props> = (props) => {
  const { error, loading, pokemon } = props;

  if (loading) return <div>'Loading...'</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div className="PokemonDetailComponent">
      {pokemon ? (
        <>Detail{pokemon.name}</>
      ) : (
        <p>There are no details of this Pokemon</p>
      )}
    </div>
  );
};
