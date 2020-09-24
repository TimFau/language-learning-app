import React from 'react';

export default function ButtonsContainer({handleSubmit, translateMode, getCard, randomNum, langOneArr, langTwoArr}) {
    return (
        <div className="button-container">
            <button type="button" onClick={getCard} className="btn btn-lg btn-left btn-light">Skip</button>
            <button type="submit" value="submit" className="btn btn-lg btn-primary btn-right" onClick={handleSubmit}>Submit</button>
            <div className="alert alert-success container-fluid">
                <div className="message">
                    <h4>Correct:</h4>
                    <span>{translateMode === "1to2" ? langTwoArr[randomNum] : langOneArr[randomNum]}</span>
                </div>
                <button type="button" onClick={getCard} className="btn btn-success btn-lg">Continue</button>
            </div>
            <div className="alert alert-danger container-fluid">
                <div className="message">
                    <h4>Correct answer:</h4>
                    <span>{translateMode === "1to2" ? langTwoArr[randomNum] : langOneArr[randomNum]}</span>
                </div>
                <button type="button" onClick={getCard} className="btn btn-danger btn-lg">Continue</button>
            </div>
        </div>
    )
}