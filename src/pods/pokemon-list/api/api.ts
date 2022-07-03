import { gql } from '@apollo/client';

export const pokemonsQuery = gql`
  query pokemonsQuery($pokemonsQueryInput: PokemonsQueryInput!) {
    pokemons(query: $pokemonsQueryInput) {
      limit
      offset
      count
      edges {
        id
        name
        types
        image
        isFavorite
      }
    }
  }
`;

export const pokemonTypesQuery = gql`
  query pokemonTypesQuery {
    pokemonTypes
  }
`;
