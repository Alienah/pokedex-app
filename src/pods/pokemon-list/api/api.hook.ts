import { useQuery, QueryResult, ApolloQueryResult } from '@apollo/client';
import { pokemonsQuery } from './api';
import { buildFetchMore } from './api.helpers';
import { Pokemon, PokemonsQueryInput } from './api.model';

interface PokemonsQuery extends Omit<QueryResult, 'data'> {
  pokemons: Pokemon[];
  totalCount: number;
  fetchMore: () => Promise<ApolloQueryResult<any>>;
}

export const usePokemonsQuery = (
  options: PokemonsQueryInput
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
    pokemons: data?.pokemons.edges.length > 0 ? data.pokemons.edges : [],
    totalCount: data?.pokemons.count,
  };
};
