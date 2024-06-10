import React, { useState, useRef } from 'react';
import "./TicTacToe.css";
import circleIcon from "../assets/circle.png";
import crossIcon from "../assets/cross.png";

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const titleRef = useRef(null);
  const boxes = Array.from({ length: 9 }, () => useRef(null));

  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }
    const newData = [...data];
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${crossIcon}' alt='X'>`;
      newData[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circleIcon}' alt='O'>`;
      newData[num] = "o";
    }
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (data) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src=${winner === 'x' ? crossIcon : circleIcon} alt='${winner}'>`;
  };

  const reset = () => {
    setLock(false);
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    titleRef.current.innerHTML = 'Tic Tac Toe';
    boxes.forEach(box => {
      box.current.innerHTML = "";
    });
  };

  const renderRow = (startIndex) => (
    <div className='row'>
      {boxes.slice(startIndex, startIndex + 3).map((box, index) => (
        <div
          key={startIndex + index}
          className='boxes'
          ref={box}
          onClick={(e) => toggle(e, startIndex + index)}
        ></div>
      ))}
    </div>
  );

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe</h1>
      <div className='board'>
        {renderRow(0)}
        {renderRow(3)}
        {renderRow(6)}
      </div>
      <button className='reset' onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
