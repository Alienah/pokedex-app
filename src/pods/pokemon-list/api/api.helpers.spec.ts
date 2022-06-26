import { QueryResult } from '@apollo/client';
import { getUpdatedVariables, getUpdatedPokemonQuery } from './api.helpers';
import { Pokemon } from './api.model';

describe('api helpers from pokemon-list', () => {
  describe('getUpdatedPokemonQuery', () => {
    const previousQueryResult: Partial<QueryResult> = {
      variables: { pokemonsQueryInput: { filter: { type: 'poison' } } },
      data: {
        pokemons: {
          offset: 0,
          limit: 10,
          edges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          count: 50,
        },
      },
    };
    it('should return new offset value when running getUpdatedPokemonQuery', () => {
      const originalOffset = previousQueryResult.data.pokemons.offset;

      const nextVariables = getUpdatedVariables(
        previousQueryResult as QueryResult
      );

      expect(nextVariables.pokemonsQueryInput.offset).not.toBe(originalOffset);
      expect(nextVariables.pokemonsQueryInput.offset).toBe(10);
    });

    it('should return same input variables when running getUpdatedPokemonQuery', () => {
      const originalFilter =
        previousQueryResult.variables.pokemonsQueryInput.filter;

      const nextVariables = getUpdatedVariables(
        previousQueryResult as QueryResult
      );

      expect(nextVariables.pokemonsQueryInput.filter).toBe(originalFilter);
    });
  });

  describe('getUpdatedPokemonQuery', () => {
    const previousResultsData = {
      pokemons: {
        count: 33,
        limit: 10,
        offset: 0,
        edges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as unknown as Pokemon[],
      },
    };
    const nextResultsData = {
      pokemons: {
        count: 33,
        limit: 10,
        offset: 10,
        edges: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as unknown as Pokemon[],
      },
    };
    it('should return the edges including the new query results when running getUpdatedPokemonQuery', () => {
      const originalEdges = previousResultsData.pokemons.edges;
      const nextResultsEdges = nextResultsData.pokemons.edges;

      const resultDataUpdated = getUpdatedPokemonQuery(
        previousResultsData,
        nextResultsData
      );

      expect(originalEdges).toHaveLength(10);
      expect(nextResultsEdges).toHaveLength(10);
      expect(resultDataUpdated.pokemons.edges).toHaveLength(20);
      expect(resultDataUpdated.pokemons.edges[1]).toBe(2);
      expect(resultDataUpdated.pokemons.edges[19]).toBe(20);
    });

    it('should return same properties values (except edges) as the previous data when running getUpdatedPokemonQuery', () => {
      const originalCount = previousResultsData.pokemons.count;
      const originalLimit = previousResultsData.pokemons.limit;
      const originalOffset = previousResultsData.pokemons.offset;

      const resultDataUpdated = getUpdatedPokemonQuery(
        previousResultsData,
        nextResultsData
      );

      expect(resultDataUpdated.pokemons.count).toBe(originalCount);
      expect(resultDataUpdated.pokemons.limit).toBe(originalLimit);
      expect(resultDataUpdated.pokemons.offset).toBe(originalOffset);
    });
  });
});
