import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'core';
import { PokemonListContainer } from 'pods/pokemon-list';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(routes.details('pokemonA'));
  };
  return (
    <>
      <h2>Hello from Home page</h2>
      <button onClick={handleNavigation}>Detail</button>
      <PokemonListContainer />
    </>
  );
};
