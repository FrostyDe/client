/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Header from "../Header";
import { useRecoilState } from "recoil";
import axios from "axios";
import {
  pokemonSelected,
  pokemonState,
  pokemonMoves,
  pokemonStats,
  pokemonTypes,
  pokemonCurrentId,
  myPokemonList,
} from "../atoms";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RotateLoader from "react-spinners/RotateLoader";
import { useState } from "react";

const API_URL = "https://limitless-beyond-70730.herokuapp.com";
// const API_URL = "http://localhost:4500/";
const PokemonDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pokemons, setPokemons] = useRecoilState(pokemonState);
  const [myPokemons, setMyPokemons] = useRecoilState(myPokemonList);
  const [nickname, setNickname] = useState("");
  const [types, setTypes] = useRecoilState(pokemonTypes);
  const [moveList, setMoveList] = useRecoilState(pokemonMoves);
  const [stats, setStats] = useRecoilState(pokemonStats);
  const [selected] = useRecoilState(pokemonSelected);
  const [pokemonId, setPokemonId] = useRecoilState(pokemonCurrentId);

  const catchPokemon = () => {
    setIsLoading(true);
    axios
      .post(API_URL + "/catch", {
        id: JSON.stringify(pokemonId),
      })
      .then((res) => {
        if (res.data === "catch fail") {
          toast.error("Pokemon catch failed, try again!", {
            position: "top-right",
          });
        } else {
          toast.success("Pokemon catched!", {
            position: "top-right",
          });
          setIsSuccess(true);
        }
      })
      .catch((err) => {
        toast.error("Couldn't connect to backend server", {
          position: "top-right",
        });
      });
    setIsLoading(false);
  };

  const newPokemon = (pokemonImage, pokemonName, pokemonNickname) => {
    setMyPokemons((myPokemons) => [
      ...myPokemons,
      { img: pokemonImage, name: pokemonName, nickname: pokemonNickname },
    ]);
  };

  return isSuccess ? (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between items-center w-7/12">
        <Link to="/">
          <img
            src="../assets/back.svg"
            className="bg-red-300 rounded-full w-10 h-10 p-2"
            alt=""
          />
        </Link>

        <h1 className="text-green-600 font-bold text-xl py-8 m-auto text-center">
          Success!!
        </h1>
      </div>

      <img
        src={pokemons[selected].data.sprites.other.home.front_default}
        className="w-7/12 lg:w-6/12 h-80 rounded-3xl shadow-card overflow-hidden object-contain bg-gradient-to-b from-white to-gray-200"
        alt=""
      />

      <h2 className="text-lg font-medium py-6">New Pokemon!</h2>

      <h1 className="pb-4 font-semibold text-2xl capitalize">
        {pokemons[selected].data.name}
      </h1>

      <form
        action=""
        className="flex flex-col justify-center items-center gap-2"
      >
        <label htmlFor="nickname" className="text-md py-4">
          Enter a Nickname for your pokemon
        </label>
        <input
          type="text"
          name="nickname"
          placeholder="Enter a nickname"
          onChange={(event) => setNickname(event.target.value)}
          className="bg-gray-200 rounded-md px-4 py-2"
        />
        <Link to="/">
          <input
            type="submit"
            name="Submit"
            onClick={() =>
              newPokemon(
                pokemons[selected].data.sprites.other.home.front_default,
                pokemons[selected].data.name,
                nickname
              )
            }
            className="bg-green-500 text-white text-semibold py-2 my-4 rounded-lg w-32 cursor-pointer"
          />
        </Link>
      </form>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between items-center w-7/12">
        <Link to="/">
          <img
            src="../assets/back.svg"
            className="bg-red-300 rounded-full w-10 h-10 p-2"
            alt=""
          />
        </Link>

        <Header title="Pokemon Detail" />
      </div>

      <img
        src={pokemons[selected].data.sprites.other.home.front_default}
        className="w-7/12 lg:w-6/12 h-80 rounded-3xl shadow-card overflow-hidden object-contain bg-gradient-to-b from-white to-gray-200"
        alt=""
      />
      <h1 className="py-6 font-semibold text-lg capitalize">
        {pokemons[selected].data.name}
      </h1>
      <div className="flex flex-col gap-4 justify-center font-medium w-7/12 lg:w-6/12">
        <h2 className="capitalize">
          Types :
          {types.map((type, i) => (
            <span
              className="block p-2 bg-yellow-300 rounded-lg m-2 text-center"
              key={i}
            >
              {type.type.name}
            </span>
          ))}
        </h2>
        <h2 className="capitalize">
          Moves :
          {moveList.slice(0, 5).map((move, i) => (
            <span
              className="block p-2 bg-green-300 rounded-lg m-2 text-center"
              key={i}
            >
              {move.move.name}
            </span>
          ))}
        </h2>

        <h2 className="capitalize mb-52">
          Stats :
          {stats.map((stat, i) => (
            <span
              className="block p-2 bg-red-300 rounded-lg m-2 text-center"
              key={i}
            >
              {stat.stat.name} {stat.base_stat}
            </span>
          ))}
        </h2>
      </div>

      <button
        className="fixed bottom-24 bg-red-600 text-white py-4 px-16 rounded-full font-bold text-2xl border-4 border-white shadow-catch transition transform duration-500 ease-out hover:-translate-y-2"
        onClick={catchPokemon}
      >
        {isLoading ? <RotateLoader color="green" /> : <span>CATCH</span>}
      </button>
      <Link
        to="/mylist"
        className="fixed bottom-10 p-2 rounded-lg font-semibold bg-blue-600 text-white w-44 shadow-card border-4 border-white text-center text-sm transition transform duration-500 ease-out hover:-translate-y-2"
      >
        My Pokemon List
      </Link>
    </div>
  );
};

export default PokemonDetail;
