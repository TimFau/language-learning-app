import Button from '@mui/material/Button';
import React from 'react';
import { handleSubmitType } from './MainApp';

interface BottomButtonsContainerProps {
    getCard: (event: React.UIEvent<HTMLElement>) => void,
    handleSubmit: (event: handleSubmitType) => void,
    langOneArr: string[],
    langTwoArr: string[],
    translateMode: string,
    randomNum: number,
    success: boolean,
    incorrect: boolean,
    showAnswer: boolean,
}

const bottomButtonsContainer = (props: BottomButtonsContainerProps) => {
    return (
        <div 
            className={'bottom-button-wrap ' + (props.success ? 'success' : '') + (props.incorrect ? 'incorrect' : '')} 
        >
            {!props.showAnswer ?
            <div>
                <Button
                    onClick={props.getCard}
                    variant="contained"
                    size="large"
                >Skip</Button>
                <Button
                    type="submit"
                    value="submit"
                    onClick={(event) => props.handleSubmit(event)}
                    variant="contained"
                    color="primary"
                    size="large"
                >Check</Button>
            </div>
            :  null }
            {props.success && props.showAnswer ?
            <div className="container-fluid">
                <div className="message">
                    <h4>Correct!</h4>
                </div>
                <Button variant="contained" onClick={props.getCard} className="btn btn-danger btn-lg">Continue</Button>
            </div>
            : null }
            {props.incorrect && props.showAnswer ?
            <div className="container-fluid">
                <div className="message">
                    <h4>Correct answer:</h4>
                    <span>{props.translateMode === "1to2" ? props.langTwoArr[props.randomNum] : props.langOneArr[props.randomNum]}</span>
                </div>
                <Button variant="contained" onClick={props.getCard} className="btn btn-danger btn-lg">Continue</Button>
            </div>
            : null }
        </div>
    )
}

export default bottomButtonsContainer;