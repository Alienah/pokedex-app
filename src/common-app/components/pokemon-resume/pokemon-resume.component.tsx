import React, { ReactElement } from 'react';
import { Pokemon } from 'pods/pokemon-detail/pokemon-detail.vm';
import { FavoriteInputContainer } from 'pods/favorite-input';
import { PokemonTypes } from 'pods/pokemon-list/api';

import './pokemon-resume.component.scss';

type ContentSize = 's' | 'm';

export interface PokemonResumeComponentProps {
  className?: string;
  pokemon: Pokemon;
  size?: ContentSize;
  showTypes?: boolean;
}

export const PokemonResumeComponent: React.FC<PokemonResumeComponentProps> = (
  props
) => {
  const { className = '', pokemon, size = 's', showTypes = true } = props;

  const buildTypes = (types: PokemonTypes): ReactElement => {
    return types.length > 1 ? (
      <ul className="types">
        {pokemon.types.map((type, index) => (
          <li className="type" key={index}>
            {type}
          </li>
        ))}
      </ul>
    ) : (
      <span data-testid="type-alone" className="type">
        {types[0]}
      </span>
    );
  };

  return (
    <div
      className={`PokemonResumeComponent ${
        size && `size-${size}`
      } ${className}`.trim()}
    >
      <div className="pokemon-main-info">
        <h2 className="title">{pokemon.name}</h2>
        {showTypes && pokemon.types?.length && buildTypes(pokemon.types)}
      </div>
      <FavoriteInputContainer
        pokemonId={pokemon.id}
        isFavorite={pokemon.isFavorite}
      />
    </div>
  );
};
