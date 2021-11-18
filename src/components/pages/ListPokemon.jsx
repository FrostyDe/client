/* eslint-disable no-unused-vars */
import Card from "../Card";
import Header from "../Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RotateLoader from "react-spinners/RotateLoader";
import { useRecoilState } from "recoil";
import {
  pokemonSelected,
  pokemonState,
  pokemonMoves,
  pokemonStats,
  pokemonTypes,
  pokemonCurrentId,
} from "../atoms";

const ListPokemon = () => {
  const [pokemons, setPokemons] = useRecoilState(pokemonState);
  const [types, setTypes] = useRecoilState(pokemonTypes);
  const [moveList, setMoveList] = useRecoilState(pokemonMoves);
  const [stats, setStats] = useRecoilState(pokemonStats);
  const [selected, setSelected] = useRecoilState(pokemonSelected);
  const [pokemonId, setPokemonId] = useRecoilState(pokemonCurrentId);
  const [isLoading, setIsloading] = useState(true);

  const getPokemonLists = async () => {
    setIsloading(true);
    let pokemonArray = [];
    for (let i = 1; i <= 5; i++) {
      const rand = Math.floor(Math.random() * 151);
      pokemonArray.push(await getPokemonData(rand));
    }
    console.log(pokemonArray);
    setPokemons(pokemonArray);
    setIsloading(false);
  };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  useEffect(() => {
    getPokemonLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Header title="Wild Pokemon Lists" />
      <div className="flex flex-col justify-center items-center">
        {isLoading ? (
          <RotateLoader color="green" />
        ) : (
          <div className="mb-44 flex flex-col lg:flex-row lg:gap-8 lg:flex-wrap justify-center items-center py-6">
            {pokemons.map((pokemon, index) => (
              <div
                key={index}
                className="my-8"
                onClick={() => {
                  setSelected(index);
                  setTypes(pokemon.data.types);
                  setMoveList(pokemon.data.moves);
                  setStats(pokemon.data.stats);
                  setPokemonId(pokemon.data.id);
                }}
              >
                <Card
                  link="details"
                  name={pokemon.data.name}
                  img={pokemon.data.sprites.other.home.front_default}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={getPokemonLists}
        className="fixed bottom-24 p-2 rounded-full font-semibold bg-red-500 text-white border-white w-32 shadow-card transition transform duration-500 ease-out hover:scale-110"
      >
        Reload
      </button>
      <Link
        to="/mylist"
        className="fixed bottom-10 p-2 rounded-md font-semibold bg-blue-600 text-white w-44 shadow-card text-center transition transform duration-500 ease-out hover:scale-110"
      >
        My Pokemon List
      </Link>
    </div>
  );
};

export default ListPokemon;
