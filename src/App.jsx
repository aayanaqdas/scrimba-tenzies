import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(genAllNewDice());

  function genAllNewDice() {
    const numArray = new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
    return numArray.map((num) => ({ value: num, isHeld: false, id: nanoid() }));
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

  function hold(id) {
    setDice((prev) =>
      prev.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  return (
    <main>
      <div className="die-container">{diceEl}</div>
      <button className="roll-btn" onClick={() => setDice(genAllNewDice())}>
        Roll
      </button>
    </main>
  );
}
