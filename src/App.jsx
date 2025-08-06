import {useState} from "react"
import Die from "./Die";

export default function App() {
  const [dice, setDice] = useState(genAllNewDice());

  function genAllNewDice() {
    const randomNumber = () => Math.ceil(Math.random() * 6);
    const numArray = Array.from({ length: 10 }, randomNumber);
    return numArray;
  }

  const diceEl = dice.map(num => {
    return <Die value={num} />
  })
  
  return (
    <main>
      <div className="die-container">
        {diceEl}
      </div>
      <button className="roll-btn" onClick={() => setDice(genAllNewDice())}>Roll</button>
    </main>
  );
}
