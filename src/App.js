import React, { useState } from "react";
import * as math from "mathjs";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [lastClearedResult, setLastClearedResult] = useState("");

  const ops = ["/", "*", "+", "-", "%"];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      try {
        const evaluatedResult = math.evaluate(calc + value);
        setResult(evaluatedResult.toString());
      } catch (error) {
        setResult("");
      }
    }
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }

    return digits;
  };

  const calculate = () => {
    try {
      const evaluatedResult = math.evaluate(calc);
      setCalc(evaluatedResult.toString());
      setResult("");
    } catch (error) {
      setResult("");
    }
  };

  const deleteLast = () => {
    if (calc === "") {
      return;
    }

    const value = calc.slice(0, -1);

    setCalc(value);
  };

  const handleClear = () => {
    setCalc("");
    setResult("");
    setLastClearedResult(calc); // Store the last cleared result
  };

  const handleMemoryRecall = () => {
    if (lastClearedResult) {
      setCalc(calc + lastClearedResult); // Append the last cleared result to the current calculation
    }
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Calculator App</h1>
      </div>
      
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""}&nbsp;
          {calc || "0"}
        </div>

        <div className="specials">
          <button onClick={handleClear}>AC</button>
          <button onClick={() => updateCalc("%")}>%</button>
          <button onClick={handleMemoryRecall}>M</button> {/* Add the memory recall functionality */}

          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
