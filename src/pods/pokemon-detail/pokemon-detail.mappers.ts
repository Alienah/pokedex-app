import * as am from './api/api.model';
import * as vm from './pokemon-detail.vm';

export const mapPokemonToVM = (data: am.Pokemon): vm.Pokemon => ({
  id: data.id,
  number: data.number,
  name: data.name,
  weight: data.weight,
  height: data.height,
  types: data.types,
  maxCP: data.maxCP,
  maxHP: data.maxHP,
  evolutions: data.evolutions,
  previousEvolutions: data.previousEvolutions,
  image: data.image,
  sound: data.sound,
  isFavorite: data.isFavorite,
});
