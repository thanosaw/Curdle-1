/*Letter component*/
import React, {useContext} from 'react';
import {AppContext} from '../App';

function Letter({letterPos, attemptVal}) 
{
const{board} = useContext(AppContext);
const letter = board[attemptVal][letterPos];
// accesses each individual letter
return <div className = "letter"> {letter}</div>;
// shows letter text
}

export default Letter;