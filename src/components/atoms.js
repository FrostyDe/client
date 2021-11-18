import { atom } from "recoil";

export const pokemonState = atom({
  key: "pokemons",
  default: [],
});

export const myPokemonList = atom({
  key: "myPokemons",
  default: [],
});

export const pokemonTypes = atom({
  key: "types",
  default: [],
});

export const pokemonMoves = atom({
  key: "moveList",
  default: [],
});

export const pokemonStats = atom({
  key: "stats",
  default: [],
});

export const pokemonCurrentId = atom({
  key: "pokemonId",
  default: 1,
});

export const pokemonSelected = atom({
  key: "selected",
  default: 1,
});
