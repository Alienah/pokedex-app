import { useQuery, QueryResult, ApolloQueryResult } from '@apollo/client';
import { mapPokemonListToVM } from '../pokemon-list.mappers';
import { pokemonsQuery, pokemonTypesQuery } from './api';
import { buildFetchMore } from './api.helpers';
import { Pokemon, PokemonsQueryInput } from './api.model';

interface PokemonsQuery extends Omit<QueryResult, 'data'> {
  pokemons: Pokemon[];
  totalCount: number;
  fetchMore: () => Promise<ApolloQueryResult<any>>;
}

interface PokemonTypesQuery extends Omit<QueryResult, 'data'> {
  pokemonTypes: string[];
}

export const usePokemonsQuery = (
  options: PokemonsQueryInput = {}
): PokemonsQuery => {
  const queryResults = useQuery(pokemonsQuery, {
    displayName: 'pokemonsQuery',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: { pokemonsQueryInput: options },
  });
  const { networkStatus, data, loading, fetchMore, ...other } = queryResults;

  return {
    ...other,
    fetchMore: buildFetchMore(queryResults),
    loading: loading && networkStatus !== 3,
    networkStatus,
    pokemons:
      data?.pokemons.edges.length > 0
        ? mapPokemonListToVM(data.pokemons.edges)
        : [],
    totalCount: data?.pokemons.count,
  };
};

export const usePokemonTypesQuery = (): PokemonTypesQuery => {
  const queryResults = useQuery(pokemonTypesQuery, {
    displayName: 'pokemonTypesQuery',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const { data, ...other } = queryResults;

  return {
    ...other,
    pokemonTypes: data?.pokemonTypes || [],
  };
};
