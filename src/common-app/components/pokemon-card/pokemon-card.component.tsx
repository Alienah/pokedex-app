import React from 'react';
import { Pokemon } from 'pods/pokemon-detail/pokemon-detail.vm';
import { PokemonResumeComponent } from '..';
import { Link } from 'react-router-dom';
import { routes } from 'core';

import './pokemon-card.component.scss';

export type CardType = 'medium' | 'short';

export interface PokemonCardComponentProps {
  pokemon: Pokemon;
  type?: CardType;
  noLink?: boolean;
}

export const PokemonCardComponent: React.FC<PokemonCardComponentProps> = (
  props
) => {
  const { pokemon, type = 'medium', noLink = false } = props;
  const isShort = type === 'short';

  const buildHeader = () => (
    <div className="card-item card-pokemon-image">
      <img src={pokemon.image} alt={`${pokemon.name} image`} />
    </div>
  );

  return (
    <div className="PokemonCardComponent">
      {noLink ? (
        buildHeader()
      ) : (
        <Link className="link" to={routes.details(pokemon.name)}>
          {buildHeader()}
        </Link>
      )}
      <PokemonResumeComponent
        className="card-item card-pokemon-resume"
        pokemon={pokemon}
        showTypes={!isShort}
        size={isShort ? 's' : 'm'}
      />
    </div>
  );
};
