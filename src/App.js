/*App*/
import './App.css';
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import { boardDefault, generateWordSet } from "./Words";
import { createContext, useEffect, useState } from "react";
import { useUserContext } from './context/userContext';
import { logout } from "./firebase";
// ./'Words' it gives me an error so I changed it

export const AppContext = createContext();

function App() {
  const { user, loading, error, logoutUser } = useUserContext();
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);

  const correctWord = "RIGHT"

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    })
  }, []) 
  
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos >4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos+1});
  }
  
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++){ 
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word Not Found");
    }

    if(currWord === correctWord ) {
      
      alert("Game Ended");
    }

  };

  async function handleLogout() {
    
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    
  }

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <>
      <nav>
        <h1>
        {user.displayName}'s Curdle
        </h1>
      </nav><AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters }}>
          <div className="game">
            <Board />
            <Keyboard />
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </AppContext.Provider></> 
        : <Auth />} </>}
        {/* {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>} */}
        
     
      
    
    </div>
  );
  // return (
    // <div className="App"> 
     //<nav>
    //   <h1>
    //     Curdle
    //   </h1>
    // </nav>
    // <AppContext.Provider value = {{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters }}>
    //   <div className = "game"> 
    //   <Board />
    //   <Keyboard />
    //   </div>
    // </AppContext.Provider>

    // </div>
  // );
}




export default App;
