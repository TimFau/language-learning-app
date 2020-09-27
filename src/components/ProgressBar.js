import React from 'react';

const progressBar = (props) => {
    return (
        <div className="container progress-container">
            <div className="progress">
                <div className="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow={props.initialCount - props.langOneArrLength} aria-valuemin="0" aria-valuemax={props.initialCount} style={props.progressWidth} />
            </div>
            <span>{props.langOneArrLength} out of {props.initialCount} words left</span>
        </div>
    )
}

export default progressBar;