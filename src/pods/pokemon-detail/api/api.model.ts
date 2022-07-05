export interface Pokemon {
  id: string;
  number: number;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  types: string[];
  maxCP: number;
  maxHP: number;
  evolutions: Pokemon[];
  previousEvolutions: Pokemon[];
  image: string;
  sound: string;
  isFavorite: boolean;
}

interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export type PokemonNameInput = string;
