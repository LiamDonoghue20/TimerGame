import { useRef, useState } from "react"
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}){
    //reference to hold the timer value
    const timer = useRef();
    //reference to open up the dialog popup for either a win/loss
    const dialog = useRef();
    //state variable to hold the time remaining so the UI updates once its ran out
    const [timeRemaining, setTimeRemaining ] = useState (targetTime * 1000)

    //check to see if the timer is still active
    const timerIsActive  = timeRemaining > 0 && timeRemaining < targetTime * 1000
    //if the is 0 seconds left on the challenge
    if (timeRemaining <= 0 ){
      //clear the current value for the timer
      clearInterval(timer.current);
      //open up the result modal via the passed on dialog reference to show the user they lost
      dialog.current.open();
    }
    //resets the time once the results modal has been closed
    function handleReset(){
      setTimeRemaining(targetTime * 1000);
    }
    
    //Starts the timer when the button has been clicked to begin and the timer is currently inactive
    function handleStart() {
      //set interval will call this code at every interval set in the function (currently 10 miliseconds)
        timer.current = setInterval(() => {
          //updates the time remaining to the previous time remaining - 10 miliseconds
          setTimeRemaining(previosTimeRemaining => previosTimeRemaining - 10);
        }, 10);
      }
      //handleStop is called when the timer is currently active
    function handleStop(){
      //opens up the dialog to display the results win/lose
        dialog.current.open();
        //cancels the interval set in "setInterval" in handleStart
        clearInterval(timer.current);
    }

    return (
        <>
        {/* passes the dialog ref to the results modal component to display either a win or a loss
        as well as the target and remaining time to calculate the score and the handleReset function so it can
        be called via the result modal component */}
          <ResultModal 
            ref={dialog} 
            targetTime={targetTime} 
            remainingTime={timeRemaining} 
            onReset={handleReset}
          />
          <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
              {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
              <button onClick={timerIsActive ? handleStop : handleStart}>
                {timerIsActive ? 'Stop' : 'Start'} Challenge
              </button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
              {timerIsActive ? 'Time is running...' : 'Timer inactive'}
            </p>
          </section>
        </>
      );
    }