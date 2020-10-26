import React from 'react';

const flashCard = (props) => {
    return(
        <div className="flash-card-container card">
            <h1 className="lang-from" onClick={props.showAnswerFc}>"{props.langFrom[props.randomNum]}"</h1>
            <h1 className="lang-to" onClick={props.showAnswerFc}>"{props.langTo[props.randomNum]}"</h1>
            <i className="material-icons swap-card" onClick={props.showAnswerFc}>swap_vertical_circle</i>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="archive btn btn-secondary" onClick={props.archiveCard}>Archive <span className="material-icons">archive</span></button >
                <button type="button" className="navigate-next btn btn-primary" onClick={props.getCard}>Next <i className="material-icons">navigate_next</i></button >
            </div>
        </div>
    )
}

export default flashCard;


