import { useQuery, QueryResult } from '@apollo/client';
import { mapPokemonToVM } from '../pokemon-detail.mappers';
import { pokemonByNameQuery } from './api';
import { Pokemon, PokemonNameInput } from './api.model';

interface PokemonByNameQuery extends Omit<QueryResult, 'data'> {
  pokemon: Pokemon;
}

export const usePokemonByNameQuery = (
  options: PokemonNameInput
): PokemonByNameQuery => {
  const queryResults = useQuery(pokemonByNameQuery, {
    displayName: 'pokemonByNameQuery',
    fetchPolicy: 'cache-and-network',
    variables: { pokemonNameInput: options },
  });
  const { data, ...other } = queryResults;

  return {
    ...other,
    pokemon: data?.pokemonByName ? mapPokemonToVM(data.pokemonByName) : null,
  };
};
