export interface Pokemon {
  id: string;
  name: string;
  types: string[];
  image: string;
  isFavorite: boolean;
  number: number;
}

export interface PokemonConnection {
  limit: number;
  offset: number;
  count: number;
  edges: Pokemon[];
}

export interface PokemonQuery {
  pokemons: PokemonConnection;
}

export interface PokemonFilterInput {
  type?: string;
  isFavorite?: boolean;
}

export interface PokemonsQueryInput {
  limit?: number;
  offset?: number;
  search?: string;
  filter?: PokemonFilterInput;
}

export type PokemonTypes = string[];
