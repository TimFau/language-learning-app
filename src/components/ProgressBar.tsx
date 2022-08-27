import LinearProgress from '@mui/material/LinearProgress';

interface ProgressBarProps {
    initialCount: number,
    langOneArrLength: number
}

const progressBar = (props: ProgressBarProps) => {
    const normalise = (value: number) => (value - props.initialCount) * 100 / (0 - props.initialCount);
    return (
        <div className="container progress-container">
            <LinearProgress variant="determinate" value={normalise(props.langOneArrLength)}/>
            <span className="progress-text">{props.langOneArrLength} out of {props.initialCount} words left</span>
        </div>
    )
}

export default progressBar;