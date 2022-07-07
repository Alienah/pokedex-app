import React from 'react';
import { ApolloError } from '@apollo/client';
import { Pokemon } from './api';
import {
  PokemonCardComponent,
  PokemonResumeComponent,
} from 'common-app/components';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton } from '@mui/material';

import './pokemon-detail.component.scss';

interface Props {
  loading: boolean;
  error: ApolloError;
  pokemon: Pokemon;
}

export const PokemonDetailComponent: React.FC<Props> = (props) => {
  const { error, loading, pokemon } = props;
  const [pokemonSound, setPokemonSound] =
    React.useState<HTMLAudioElement>(null);

  React.useEffect(() => {
    pokemon && setPokemonSound(new Audio(pokemon.sound));
  }, [pokemon]);

  const playSound = () => {
    pokemonSound.play();
  };

  if (loading)
    return (
      <div className="PokemonDetailComponent">
        <CircularProgress color="inherit" />
      </div>
    );
  if (error)
    return <div className="PokemonDetailComponent">Error ${error.message}</div>;

  return (
    <div className="PokemonDetailComponent">
      {pokemon ? (
        <>
          <div className="pokemon__container">
            <div className="pokemon__header">
              <div className="pokemon__image-container">
                <img src={pokemon.image} alt={`Image of ${pokemon.name}`} />
              </div>
              {pokemonSound && (
                <IconButton
                  className="audio-button"
                  onClick={playSound}
                  aria-label="Play the pokemon sound"
                  size="large"
                >
                  <VolumeUpIcon className="audio-icon" fontSize="large" />
                </IconButton>
              )}
            </div>
            <div className="pokemon__info-container">
              <PokemonResumeComponent pokemon={pokemon} size="m" />
              <div className="stat cp-data">CP: {pokemon.maxCP}</div>
              <div className="stat hp-data">HP: {pokemon.maxHP}</div>
              <div className="size__container">
                <div className="size">
                  <h3>Weight</h3>
                  <span>
                    {pokemon.weight.minimum} - {pokemon.weight.maximum}
                  </span>
                </div>
                <div className="size">
                  <h3>Height</h3>
                  <span>
                    {pokemon.height.minimum} - {pokemon.height.maximum}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {pokemon.evolutions.length > 0 && (
            <div className="pokemon__evolutions">
              <h2>Evolutions</h2>
              <ul className="evolution-list">
                {pokemon.evolutions.map((evolution, index) => (
                  <li key={index}>
                    <PokemonCardComponent pokemon={evolution} type="short" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p>There are no details of this Pokemon</p>
      )}
    </div>
  );
};
