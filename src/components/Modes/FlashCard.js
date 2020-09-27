import React from 'react';

const flashCard = (props) => {
    return(
        <div className="flash-card-container">
            <h1 className="lang-from" onClick={props.showAnswerFc}>"{props.langFrom[props.randomNum]}"</h1>
            <h1 className="lang-to" onClick={props.showAnswerFc}>"{props.langTo[props.randomNum]}"</h1>
            <i className="material-icons swap-card" onClick={props.showAnswerFc}>swap_vertical_circle</i>
            <span className="navigate-next" onClick={props.getCard}><i className="material-icons">navigate_next</i></span>
            <span className="archive" onClick={props.archiveCard}><i className="material-icons">archive</i></span>
        </div>
    )
}

export default flashCard;


