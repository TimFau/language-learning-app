import React from 'react';
import FlashCard from './Modes/FlashCard';
import WordBank from './Modes/WordBank';
import Keyboard from './Modes/Keyboard';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';

const form = (props) => {
    return (
        <div className="wrapper">
            {props.children /* Progress bar */}
            <form onSubmit={props.handleSubmit}  id="mainApp">
                {props.inputMode === 'Flashcard' ?
                    <FlashCard 
                    showAnswerFc={() => props.showAnswerFc()}
                    showAnswer={props.showAnswer}
                    getCard={props.getCard}
                    archiveCard={props.archiveCard}
                    langTo={props.langTo}
                    langFrom={props.langFrom}
                    randomNum={props.randomNum}
                    >
                        Translate to <span>{props.translateMode === "1to2" ? props.language1 : props.language2}</span>
                    </FlashCard>
                : null }
                {props.inputMode === 'Keyboard' ?
                    <Keyboard 
                        langTo={props.langTo}
                        langFrom={props.langFrom}
                        randomNum={props.randomNum}
                        translationInputValue={props.translationInputValue}
                        keyboardModeHandleChange={(e) => props.keyboardModeHandleChange(e)}
                    >
                        Translate to <span>{props.translateMode === "1to2" ? props.language2 : props.language1}</span>
                    </Keyboard>
                : null }
                {props.inputMode === 'Wordbank' ?
                    <WordBank 
                        langTo={props.langTo}
                        langFrom={props.langFrom}
                        randomNum={props.randomNum}
                        wordBank={props.wordBank}
                        keyboardModeHandleChange={(e) => props.keyboardModeHandleChange(e)}
                        translateMode={props.translateMode}
                    >
                        Translate to <span>{props.translateMode === "1to2" ? props.language2 : props.language1}</span>
                    </WordBank>
                : null }
            </form>
            <Dialog id="success-modal" open={props.langOneArrLength === 0}>
                <DialogTitle>
                    Congratulations!
                </DialogTitle>
                <DialogContent>
                    <h3>You've finished the list!</h3>
                </DialogContent>
                <ButtonGroup
                    color="primary"
                    variant="outlined"
                    fullWidth
                >
                    <Button variant="contained" onClick={props.goToDeckSelector}>Return to Deck Selector</Button>
                </ButtonGroup>
            </Dialog>
        </div>
    )
}

export default form;