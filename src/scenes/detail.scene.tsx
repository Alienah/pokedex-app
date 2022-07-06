import React from 'react';
import { PokemonDetailContainer } from 'pods/pokemon-detail';
import { Link, useParams } from 'react-router-dom';

export const DetailPage: React.FC = () => {
  const { name } = useParams();
  return (
    <div className="DetailPage page">
      <Link to="/">Back to home page</Link>

      <PokemonDetailContainer pokemonName={name} />
    </div>
  );
};
