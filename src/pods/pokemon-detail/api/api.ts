import { gql } from '@apollo/client';

export const pokemonByNameQuery = gql`
  query pokemonByNameQuery($pokemonNameInput: String!) {
    pokemonByName(name: $pokemonNameInput) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      types
      maxCP
      maxHP
      evolutions {
        id
        name
        types
        image
      }
      previousEvolutions {
        id
        name
      }
      image
      sound
      isFavorite
    }
  }
`;
