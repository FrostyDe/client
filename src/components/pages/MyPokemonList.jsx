/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import CardItem from "../CardItem";
import Header from "../Header";
import { useRecoilState } from "recoil";
import axios from "axios";
import { myPokemonList } from "../atoms";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPokemonList = () => {
  const [myPokemons, setMyPokemons] = useRecoilState(myPokemonList);

  const releasePokemon = (index) => {
    axios.get("http://localhost:4500/release").then((res) => {
      if (res.data.data === "release fail") {
        toast.error(
          `Release pokemon fail. ( ${res.data.number} is not a prime number )`,
          {
            position: "top-right",
          }
        );
      } else {
        toast.success(
          `Pokemon has been released ( ${res.data.number} is a prime number )`,
          {
            position: "top-right",
          }
        );
        let arr = [...myPokemons];
        arr.splice(index, 1);
        setMyPokemons(arr);
      }
    });
  };

  const renamePokemon = (index) => {
    let arr = JSON.parse(JSON.stringify(myPokemons));

    if (arr[index].renameId === undefined) {
      arr[index].renameId = 0;
      axios
        .post("http://localhost:4500/rename", {
          name: myPokemons[index].nickname,
          id: JSON.stringify(arr[index].renameId),
        })
        .then((res) => {
          toast("Renamed", {
            position: "top-right",
            autoClose: 1000,
          });
          arr[index].newNickname = res.data;
          arr[index].renameId += 1;
          setMyPokemons(arr);
        });
    } else {
      axios
        .post("http://localhost:4500/rename", {
          name: myPokemons[index].nickname,
          id: JSON.stringify(arr[index].renameId),
        })
        .then((res) => {
          toast("Renamed", {
            position: "top-right",
            autoClose: 1000,
          });
          arr[index].newNickname = res.data;
          arr[index].renameId += 1;
          setMyPokemons(arr);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between items-center w-7/12">
        <Link to="/">
          <img
            src="../assets/back.svg"
            className="bg-red-300 rounded-full w-10 h-10 p-2"
            alt=""
          />
        </Link>

        <Header title="My Pokemon List" />
      </div>
      <div className="lg:flex lg:flex-wrap lg:items-center lg:justify-start lg:gap-8 lg:w-7/12 py-8">
        {myPokemons.map((mypokemon, index) => (
          <div key={index}>
            <CardItem
              release={() => releasePokemon(index)}
              rename={() => renamePokemon(index)}
              pokemonName={mypokemon.name}
              name={
                mypokemon.newNickname === undefined
                  ? mypokemon.nickname
                  : mypokemon.newNickname
              }
              img={mypokemon.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPokemonList;
