import React from 'react';

export default function ProgressBar({langOneArrLength, progressWidth, initialCount}) {
    return (
        <div className="container progress-container">
            <div className="progress">
                <div className="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow={initialCount - langOneArrLength} aria-valuemin="0" aria-valuemax={initialCount} style={progressWidth} />
            </div>
            <span>{langOneArrLength} out of {initialCount} words left</span>
        </div>
    )
}