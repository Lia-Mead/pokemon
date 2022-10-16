import React from "react";
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
            <div style={{minWidth: "100px"}}>
                <PokemonAvatar pokemon={pokemon} />
            </div>

            <div className="points-box">
                <div
                    style={{ width: `${points}%`, backgroundColor: `${color}` }}
                    className="points"
                ></div>
                <div className="points-font"> {points} / 100</div>
            </div>
        </div>
    );
};

export default Player;
