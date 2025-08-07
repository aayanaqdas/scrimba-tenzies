import { useState, useEffect, useRef } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => genAllNewDice());

  const gameWon = dice.every((obj) => obj.value === dice[0].value && obj.isHeld);

  const btnRef = useRef(null);

  useEffect(() => {
    if (btnRef.current && gameWon) {
      btnRef.current.focus();
    }
  }, [gameWon]);

  function genAllNewDice() {
    const numArray = new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
    return numArray.map((num) => ({ value: num, isHeld: false, id: nanoid() }));
  }

  function rollDice() {
    if (gameWon) {
      setDice(genAllNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => (die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }))
      );
    }
  }

  function hold(id) {
    setDice((prev) =>
      prev.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  const diceEl = dice.map((dieObj) => {
    return (
      <Die
        key={dieObj.id}
        value={dieObj.value}
        id={dieObj.id}
        isHeld={dieObj.isHeld}
        onClick={hold}
      />
    );
  });

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between
        rolls.
      </p>
      <div className="die-container">{diceEl}</div>
      <button className="roll-btn" ref={btnRef} onClick={rollDice}>
        {gameWon ? "New game" : "Roll"}
      </button>
    </main>
  );
}
