import { gql } from '@apollo/client';

export const favoritePokemonMutation = gql`
  mutation favoritePokemonMutation($pokemonId: ID!) {
    favoritePokemon(id: $pokemonId) {
      id
      name
      isFavorite
    }
  }
`;

export const unFavoritePokemonMutation = gql`
  mutation unFavoritePokemonMutation($pokemonId: ID!) {
    unFavoritePokemon(id: $pokemonId) {
      id
      name
      isFavorite
    }
  }
`;
