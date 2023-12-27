import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';

//as a reference is passed to this component, it must be stored in a variable "ResultModal" and exported
const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref){
    //sets a local variable of dialog to the reference passed to this component through "ref"
    const dialog = useRef();
    //set userLost variable to true if the remaining time passed to the component via props is = 0
    const userLost = remainingTime <= 0
    //formats the remaining time from miliseconds to seconds and fixes it to 2 decimal places
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    //works out the score by dividing the remaining time by the target time from 1 (to give a score as a %)
    //and then multiplied by 100 to give a score out of 100
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);


    //used to set properties and methods that should be accessable outside the component
    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        };
    } );
    //createPortal used to port the JSX code to the modal div in the DOM
    return createPortal( 
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
         {userLost && <h2>You Lost</h2> }
         {!userLost && <h2>Your score: {score}</h2>}
        <p>The target time was <strong>{targetTime} seconds</strong></p>
        <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById('modal')
    );
})

export default ResultModal;