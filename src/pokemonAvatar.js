import { useEffect, useState } from "react";
import axios from "./Axios";


export default function PokemonAvatar({ pokemon }) {
    const [pokemonAvatar, setPokemonAvatar] = useState(null);

        useEffect(() => {
            pokemon && getPokemonAvatar(pokemon);
        }, [pokemon]);


    const getPokemonAvatar = (name) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then((res) => {
            console.log(res.data);
            setPokemonAvatar(res.data);
        });
    };



    return (
        <>
            {pokemon ? (
                <img alt="pokemon" src={pokemonAvatar?.sprites?.back_default} />
            ) : (
                <p>Start Game</p>
            )}
        </>
    );
}
