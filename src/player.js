import React, { useState, useEffect } from "react";
import "./player.css";
import PokemonAvatar from "./pokemonAvatar";


const Player = ({
    points,
    playerName,
    color,
    pokemon
}) => {
   

    return (
        <div className="player">
            <h3>{playerName}</h3>
            <PokemonAvatar
                pokemon={pokemon}
            />

            <div className="white">
                <div style={{ width: `${points}%`, backgroundColor: `${color}` }} className="green"></div>
                <div> {points} / 100</div>
            </div>
        </div>
    );
};

export default Player;
