import pokemonData from '../data/pokemon';

export interface PokemonBasicInfo {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const pokemonInfo: PokemonBasicInfo[] = pokemonData.map(item => ({
  id: item.id,
  name: item.name,
  image: item.imageURL,
  types: item.types
 }));

 export default pokemonInfo;