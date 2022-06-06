import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

const progressBar = (props) => {
    const normalise = value => (value - props.initialCount) * 100 / (0 - props.initialCount);
    return (
        <div className="container progress-container">
            <LinearProgress variant="determinate" value={normalise(props.langOneArrLength)}/>
            <span>{props.langOneArrLength} out of {props.initialCount} words left</span>
        </div>
    )
}

export default progressBar;