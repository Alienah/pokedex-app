import { useMutation, FetchResult, ApolloError } from '@apollo/client';
import { POKEMONS_QUERY } from 'pods/pokemon-list/api';
import { favoritePokemonMutation, unFavoritePokemonMutation } from './api';
import { PokemonId } from './api.model';

interface FavoriteMutationInfo {
  favoritePokemon: (
    pokemonId: PokemonId
  ) => Promise<FetchResult<Record<string, any>>>;
  loading: boolean;
  error: ApolloError;
}
interface UnFavoriteMutationInfo {
  unFavoritePokemon: (
    pokemonId: PokemonId
  ) => Promise<FetchResult<Record<string, any>>>;
  loading: boolean;
  error: ApolloError;
}

export const useFavoritePokemonMutation = (): FavoriteMutationInfo => {
  const [favorite, { loading, error }] = useMutation(favoritePokemonMutation);

  const favoritePokemon = async (pokemonId: PokemonId) => {
    try {
      const response = await favorite({
        variables: {
          pokemonId,
        },
      });
      return onFavoritePokemonSuccessful(response);
    } catch (error) {
      return onFavoritePokemonFailed(error, pokemonId);
    }
  };
  const onFavoritePokemonSuccessful = (response: FetchResult) => {
    const {
      data: { favoritePokemon },
    } = response;
    console.log(`${favoritePokemon.name} added to Favorites`);
    return response;
  };
  const onFavoritePokemonFailed = (error: string, pokemonId: string) => {
    console.warn(
      `Error trying to favorite the pokemon with id: ${pokemonId}.`,
      error
    );
    throw error;
  };

  return { favoritePokemon, loading, error };
};

export const useUnFavoritePokemonMutation = (): UnFavoriteMutationInfo => {
  const [unFavorite, { loading, error }] = useMutation(
    unFavoritePokemonMutation
  );

  const unFavoritePokemon = async (pokemonId: PokemonId) => {
    try {
      const response = await unFavorite({
        variables: {
          pokemonId,
        },
        refetchQueries: [POKEMONS_QUERY],
      });
      return onUnFavoritePokemonSuccessful(response);
    } catch (error) {
      return onUnFavoritePokemonFailed(error, pokemonId);
    }
  };
  const onUnFavoritePokemonSuccessful = (response: FetchResult) => {
    const {
      data: { unFavoritePokemon },
    } = response;
    console.log(`${unFavoritePokemon.name} removed from Favorites`);
    return response;
  };
  const onUnFavoritePokemonFailed = (error: string, pokemonId: string) => {
    console.warn(
      `Error trying to unfavorite the pokemon with id: ${pokemonId}.`,
      error
    );
    throw error;
  };

  return { unFavoritePokemon, loading, error };
};
