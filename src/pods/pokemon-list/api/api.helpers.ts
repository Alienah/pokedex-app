import { QueryResult, ApolloQueryResult } from '@apollo/client';
import { PokemonsQueryInput, PokemonQuery } from './api.model';

interface PokemonsVariables {
  pokemonsQueryInput?: PokemonsQueryInput;
}

export const getUpdatedVariables = (
  queryResults: QueryResult
): PokemonsVariables => {
  const { variables, data } = queryResults;
  if (!data || !variables) {
    return;
  }

  const { pokemonsQueryInput } = variables;
  const pokemonsEdges = data?.pokemons.edges;
  const nextVariables = { ...variables };
  nextVariables.pokemonsQueryInput = {
    ...pokemonsQueryInput,
    offset: pokemonsEdges.length,
  };

  return nextVariables;
};

export const getUpdatedPokemonQuery = (
  prev: PokemonQuery,
  fetchMoreResult: PokemonQuery
): PokemonQuery => {
  if (!fetchMoreResult) return prev;
  const prevEdges = prev.pokemons?.edges;
  const newEdges = fetchMoreResult.pokemons?.edges;
  const edges = [...prevEdges, ...newEdges];
  const pokemons = { ...prev.pokemons, edges };
  return { ...prev, pokemons };
};

export const buildFetchMore =
  (queryResults: QueryResult): (() => Promise<ApolloQueryResult<any>>) =>
  () => {
    const variables = getUpdatedVariables(queryResults);
    const updateQuery = (
      prev: PokemonQuery,
      { fetchMoreResult }
    ): PokemonQuery => getUpdatedPokemonQuery(prev, fetchMoreResult);

    return queryResults.fetchMore({ variables, updateQuery });
  };
