import React from 'react';
import {
  PokemonId,
  useFavoritePokemonMutation,
  useUnFavoritePokemonMutation,
} from './api';
import { NotificationComponent } from 'common/components';
import { FavoriteInputComponent } from './favorite-input.component';
import { FetchResult } from '@apollo/client';

interface Props {
  isFavorite: boolean;
  pokemonId: string;
}

export const FavoriteInputContainer: React.FC<Props> = (props) => {
  const { isFavorite, pokemonId } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] =
    React.useState<string>('An error occurred');
  const { favoritePokemon, loading } = useFavoritePokemonMutation();
  const { unFavoritePokemon, loading: loadingUnfavorite } =
    useUnFavoritePokemonMutation();
  const updatingMessage = `Updating pokemon with id ${pokemonId}`;

  const updateUsing = (
    mutation: (pokemonId: PokemonId) => Promise<FetchResult>,
    pokemonId: string
  ) => {
    mutation(pokemonId)
      .then((response) => response)
      .catch((error) => {
        error.message && setErrorMessage(error.message);
        setOpen(true);
      });
  };

  const handleFavorite = (isFavorite: boolean) => {
    const mutationType = isFavorite ? favoritePokemon : unFavoritePokemon;
    mutationType && updateUsing(mutationType, pokemonId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="FavoriteInputContainer">
      <FavoriteInputComponent
        onChange={handleFavorite}
        isFavorite={isFavorite}
      />
      <NotificationComponent
        open={loading || loadingUnfavorite}
        content={updatingMessage}
        type="info"
        onClose={handleClose}
      />
      <NotificationComponent
        open={open}
        content={errorMessage}
        type="error"
        onClose={handleClose}
      />
    </div>
  );
};
