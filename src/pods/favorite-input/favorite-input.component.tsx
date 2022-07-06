import React, { SyntheticEvent } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

import './favorite-input.component.scss';

interface Props {
  isFavorite: boolean;
  onChange: (isFavorite: boolean) => void;
}

export const FavoriteInputComponent: React.FC<Props> = (props) => {
  const { isFavorite: initialIsfavorite, onChange } = props;
  const [isFavorite, setIsFavorite] =
    React.useState<boolean>(initialIsfavorite);

  const handleFavorite = (e: SyntheticEvent): void => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onChange(!isFavorite);
  };
  const favoriteClassName = isFavorite ? 'favorite' : '';

  return (
    <IconButton
      className={`FavoriteInputComponent ${favoriteClassName}`}
      onClick={handleFavorite}
      aria-label="Add to favorites"
      aria-pressed={isFavorite}
    >
      {isFavorite ? (
        <FavoriteIcon className="fav-icon" data-testid="filled-button" />
      ) : (
        <FavoriteBorderIcon className="fav-icon" data-testid="border-button" />
      )}
    </IconButton>
  );
};
