import { useState, useRef } from "react";

export default function Player() {
  //reference to hold the player name 
  const playerName = useRef();

  //state to update the UI once the player name has been updated
  const [enteredPlayerName, setEnteredPlayerName] = useState(null)


  //upon clicking the set name button, this function is called
  function handleClick() {
    //uses the setter to set the enteredPlayerName state value to the current value of the reference
    setEnteredPlayerName(playerName.current.value)
    //resets the current playerName reference value to an empty string to clear the input in the UI
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
