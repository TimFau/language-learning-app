import React from 'react';

import FlashCard from '../MainApp/Modes/FlashCard';
import WordBank from '../MainApp/Modes/WordBank';
import Keyboard from '../MainApp/Modes/Keyboard';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import Icon from '@mui/material/Icon';


type RootState = {
    language1: string | undefined,
    language2: string | undefined,
    langFrom: Array<any>,
    langTo: Array<any>,
    translationInputValue: string,
    wordBank: Array<any>,
    translateMode: string,
    inputMode: string,
    showAnswer: boolean,
    randomNum: number,
    langOneArrLength: number,
    handleSubmit: (event: any) => void,
    showAnswerFc: (event: any) => void,
    getCard: (event: any) => void,
    archiveCard: (event: any) => void,
    keyboardModeHandleChange: (event: any) => void,
    goToDeckSelector: (event: any) => void,
    children: React.ReactNode
}

class Deck extends React.Component<RootState> {
    render() {
        return (
            <div className="wrapper">
                {this.props.children /* Progress bar */}
                <form onSubmit={this.props.handleSubmit}  id="mainApp">
                    {this.props.inputMode === 'Flashcard' ?
                        <FlashCard 
                        showAnswerFc={this.props.showAnswerFc}
                        showAnswer={this.props.showAnswer}
                        getCard={this.props.getCard}
                        archiveCard={this.props.archiveCard}
                        langTo={this.props.langTo}
                        langFrom={this.props.langFrom}
                        randomNum={this.props.randomNum}
                        >
                            Translate to <span>{this.props.translateMode === "1to2" ? this.props.language2 : this.props.language1}</span>
                        </FlashCard>
                    : null }
                    {this.props.inputMode === 'Keyboard' ?
                        <Keyboard 
                            langTo={this.props.langTo}
                            langFrom={this.props.langFrom}
                            randomNum={this.props.randomNum}
                            translationInputValue={this.props.translationInputValue}
                            keyboardModeHandleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.keyboardModeHandleChange(event)}
                        >
                            Translate to <span>{this.props.translateMode === "1to2" ? this.props.language2 : this.props.language1}</span>
                        </Keyboard>
                    : null }
                    {this.props.inputMode === 'Wordbank' ?
                        <WordBank 
                            langTo={this.props.langTo}
                            langFrom={this.props.langFrom}
                            randomNum={this.props.randomNum}
                            wordBank={this.props.wordBank}
                            keyboardModeHandleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.keyboardModeHandleChange(event)}
                            translateMode={this.props.translateMode}
                        >
                            Translate to <span>{this.props.translateMode === "1to2" ? this.props.language2 : this.props.language1}</span>
                        </WordBank>
                    : null }
                </form>
                <Dialog id="success-modal" open={this.props.langOneArrLength === 0}>
                    <Icon color="primary" className="congrats-icon">emoji_events</Icon>
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
                        <Button variant="contained" onClick={this.props.goToDeckSelector}>Return to Deck Loader</Button>
                    </ButtonGroup>
                </Dialog>
            </div>
        )
    }
}

export default Deck