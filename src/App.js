/*App*/
import './App.css';
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault } from "./Words";
import { createContext, useState } from "react";
// ./'Words' it gives me an error so I changed it

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos >4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos+1})
  }
  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  }
  const onEnter = () => {
    if (currAttempt.letterPos!==5) return;
    setCurrAttempt({attempt: currAttempt.attempt+1, letterPos: 0})
  }

  return (
    <div className="App"> 
    <nav>
      <h1>
        Curdle
      </h1>
    </nav>
    <AppContext.Provider value = {{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter }}>
      <div className = "game"> 
      <Board />
      <Keyboard />
      </div>
    </AppContext.Provider>

    </div>
  );
}

export default App;
