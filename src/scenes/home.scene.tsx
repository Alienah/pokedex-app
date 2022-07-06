import React from 'react';
import { PokemonListContainer } from 'pods/pokemon-list';

export const HomePage: React.FC = () => {
  return (
    <div className="HomePage page">
      <PokemonListContainer />
    </div>
  );
};
