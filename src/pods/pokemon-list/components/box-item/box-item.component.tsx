import React from 'react';
import { Pokemon } from 'pods/pokemon-detail/pokemon-detail.vm';
import { PokemonResumeComponent } from 'common-app/components';
import { useNavigate } from 'react-router-dom';
import { routes } from 'core';

import './box-item.component.scss';

export type CardType = 'medium' | 'short';

export type PokemonForCard = Omit<
  Pokemon,
  | 'weight'
  | 'height'
  | 'maxCP'
  | 'maxHP'
  | 'evolutions'
  | 'previousEvolutions'
  | 'sound'
>;

export interface BoxItemComponentProps {
  pokemon: PokemonForCard;
}

export const BoxItemComponent: React.FC<BoxItemComponentProps> = (props) => {
  const { pokemon } = props;
  const navigate = useNavigate();

  const navigateToPokemon = () => {
    navigate(routes.details(pokemon.name));
  };

  return (
    <div
      tabIndex={0}
      className="BoxItemComponent"
      onClick={navigateToPokemon}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigateToPokemon();
      }}
      role="link"
      aria-label={`Link to ${routes.details(pokemon.name)}`}
    >
      <div className="box-item box-item__image">
        <img
          className="image"
          src={pokemon.image}
          alt={`${pokemon.name} image`}
        />
      </div>
      <PokemonResumeComponent
        className="box-item box-item__resume"
        pokemon={pokemon}
      />
    </div>
  );
};
