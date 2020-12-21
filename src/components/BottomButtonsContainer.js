import React from 'react';
import Button from '@material-ui/core/Button';

const bottomButtonsContainer = (props) => {
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
                    onClick={props.handleSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                >Check</Button>
            </div>
            : 
                <Button variant="contained" onClick={props.getCard} className="btn btn-danger btn-lg">Continue</Button>
            }
            {props.success && props.showAnswer ?
            <div className="alert alert-success container-fluid">
                <div className="message">
                    <h4>Correct!</h4>
                    {/* <span>{props.translateMode === "1to2" ? props.langTwoArr[props.randomNum] : props.langOneArr[props.randomNum]}</span> */}
                </div>
            </div>
            : null }
            {props.incorrect && props.showAnswer ?
            <div className="alert alert-danger container-fluid">
                <div className="message">
                    <h4>Correct answer:</h4>
                    <span>{props.translateMode === "1to2" ? props.langTwoArr[props.randomNum] : props.langOneArr[props.randomNum]}</span>
                </div>
            </div>
            : null }
        </div>
    )
}

export default bottomButtonsContainer;