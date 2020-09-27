import React from 'react';

const flashCard = (props) => {
    return(
        <div className="keyboard-container">
            <h1 className="lang-from">"{props.langFrom[props.randomNum]}"</h1>
            <h1 className="lang-to">"{props.langTo[props.randomNum]}"</h1>
            <input type="text" placeholder="Enter translation" value={props.translationInputValue} onChange={props.keyboardModehandleChange} className="form-control" />
        </div>
    )
}

export default flashCard;
