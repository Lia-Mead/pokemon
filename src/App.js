import { useEffect, useState } from "react";
import "./App.css";
import Player from "./player";
import axios from "./Axios";
import { Confirm } from "react-st-modal";

function App() {
    const [pokemonArray, setPokemonArray] = useState([]);
    const [pokemonOne, setPokemonOne] = useState();
    const [pokemonTwo, setPokemonTwo] = useState();
    const [pointsOne, setPointsOne] = useState(100);
    const [pointsTwo, setPointsTwo] = useState(100);
    const [isFighting, setIsFighting] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [diceOne, setDiceOne] = useState(0);
    const [diceTwo, setDiceTwo] = useState(0);
    const [wonBattle, setWonBattle] = useState(0);

    const startGame = () => {
        const randomNumberOne = getRandomNumber(pokemonArray.length - 1);
        const randomNumberTwo = getRandomNumber(pokemonArray.length - 1);

        setPokemonOne(pokemonArray[randomNumberOne]);
        setPokemonTwo(pokemonArray[randomNumberTwo]);
        setPointsOne(100)
        setPointsTwo(100)
        setDiceOne(0)
        setDiceTwo(0)
        setWonBattle(0);
        setIsStart(true);
    };


    const rollDices = () => {
        setIsFighting(true);
        let dice1 = getRandomNumber(6);
        let dice2 = getRandomNumber(6);
        setDiceOne(dice1);
        setDiceTwo(dice2);

        setPointsOne((prev) => {
            if (prev - dice2 <= 0) {
                return 0;
            } else {
                return prev - dice2;
            }
        });
        setPointsTwo((prev) => {
            if (prev - dice1 <= 0) {
                return 0;
            } else {
                return prev - dice1;
            }
        });

        setTimeout(() => {
            if (dice1 === 6 && pointsTwo > 0) {
                // alert("Player rolls again");
                dice1 = getRandomNumber(6);
                setDiceOne(dice1);
                setPointsTwo((prev) => prev - dice1);
            }
            if (dice2 === 6 && pointsOne > 0) {
                // alert("opponent rolles again");
                dice2 = getRandomNumber(6);
                setDiceTwo(dice2);
                setPointsOne((prev) => prev - dice2);
            }
            
        }, 500);

        setTimeout(() => {
            setIsFighting(false);
        }, 1000);
    };

    const getRandomNumber = (lastIndex) => {
        return Math.floor(Math.random() * lastIndex + 1);
    };

    const getPokemonNameArray = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/`).then((res) => {
            // console.log(res.data);
            const pokNames = res.data.results.map((pok) => pok.name);
            console.log("pokNames", pokNames);

            setPokemonArray(pokNames);
        });
    };

    useEffect(() => {
        getPokemonNameArray();
    }, []);

    useEffect(
        () => async () => {
            if (pointsOne <= 0) {
                alert("GAME OVER");
                startGame();
            } else if (pointsTwo <= 0) {
                const result = await Confirm(
                    "You Won. Do you want to keep your pokemon?"
                );

                if (result) {
                    setWonBattle((prev) => prev + 1)
                    const randomNumberTwo = getRandomNumber(
                        pokemonArray.length - 1
                    );

                    setPokemonTwo(pokemonArray[randomNumberTwo]);
                    setPointsTwo(100);
                    setPointsOne(100);
                } else {
                    startGame();
                }
            }
        },
        [pointsOne, pointsTwo]
    );

    return (
        <div className="App">
            <header className="App-header">
                <h1>Pokemon Attack</h1>
                <div className="con">
                    <div className="box">
                        <Player
                            points={pointsOne}
                            playerName={"Player"}
                            color={"#78f378"}
                            pokemon={pokemonOne}
                        />

                        <div className="dice">{diceOne}</div>
                    </div>

                    <div className="box">
                        <Player
                            points={pointsTwo}
                            playerName={"Opponent"}
                            color={"#dfaeff"}
                            pokemon={pokemonTwo}
                        />

                        <div className="dice">{diceTwo}</div>
                    </div>
                </div>

                <h3>battles won: {wonBattle}</h3>
                <div className="con">
                    <button
                        className={isFighting || !isStart ? "btn dis" : "btn"}
                        onClick={() => rollDices()}
                        disabled={isFighting || !isStart}
                    >
                        Attack
                    </button>
                    <button className="btn start" onClick={() => startGame()}>
                        Start Game
                    </button>
                </div>
            </header>
        </div>
    );
}

export default App;
