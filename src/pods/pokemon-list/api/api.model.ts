export interface Pokemon {
  id: number;
  name: string;
  types: string[];
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

interface PokemonFilterInput {
  type?: string;
  isFavorite?: boolean;
}

export interface PokemonsQueryInput {
  limit?: number;
  offset?: number;
  search?: string;
  filter?: PokemonFilterInput;
}
