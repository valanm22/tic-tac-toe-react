import HomeLayout from './Home.layout';
import { useState } from 'react';

const Home = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }]);
  const [xIsNext, setXIsNext] = useState(true); 
  const [stepNumber, setStepNumber] = useState(0); 
  const [reverseMoves, setReverseMoves] = useState(false);
  const [lineWinner, setLineWinner] = useState([]);

  const currentPlayer = xIsNext ? 'X' : 'O';

  const currentHistory = history[stepNumber];

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
    setLineWinner(calculateWinner(history[step].squares));
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }

    return [];
  }

  const handleClick = (i) => {
    if (calculateWinner(currentHistory.squares).length || currentHistory.squares[i]) return;
    
    const newSquares = currentHistory.squares.slice();
    newSquares[i] = currentPlayer;
    
    const newHistory = history.slice(0, stepNumber + 1);

    const row = Math.ceil((i + 1) / 3);
    const col = (i + 1) - ((row - 1) * 3);

    setHistory(newHistory.concat([{
      squares: newSquares,
      move: {
        row,
        col,
        currentPlayer
      },
    }]));
    setStepNumber(newHistory.length)
    setXIsNext(!xIsNext);
    setLineWinner(calculateWinner(newSquares));
  }

  const winner = calculateWinner(currentHistory.squares);

  let status;

  if (winner.length) {
    status = `Winner: ${xIsNext ? 'O' : 'X'}`;
  } else if (stepNumber === 9) {
    status = `Draw game`
  } else {
    status = `Next player: ${currentPlayer}`
  }

  return (
    <HomeLayout 
        handleClick={handleClick} 
        currentHistory={currentHistory}
        lineWinner={lineWinner} 
        status={status} 
        reverseMoves={reverseMoves} 
        stepNumber={stepNumber} 
        history={history} 
        jumpTo={jumpTo} 
        setReverseMoves={setReverseMoves}
    />
  );
}

export default Home;
