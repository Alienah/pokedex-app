import * as am from './api/api.model';
import * as vm from './pokemon-list.vm';

const mapPokemonToVM = (data: am.Pokemon): vm.Pokemon => ({
  id: data.id,
  name: data.name,
  types: data.types,
  image: data.image,
  isFavorite: data.isFavorite,
  number: data.number,
});

export const mapPokemonListToVM = (data: am.Pokemon[]): vm.Pokemon[] =>
  (data.length > 0 && data.map(mapPokemonToVM)) || [];
