import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    CircularProgress, Button, ButtonGroup, 
    Typography, DialogTitle, DialogContent, Dialog,
    TextField, Icon, Drawer }
from '@material-ui/core/';

export default function deckDialog(props) {

    return (
        <Dialog open={props.deckDialogOpen} onClose={props.setDialogClosed} className="deck-dialog">
            <DialogTitle id="simple-dialog-title">Deck Options</DialogTitle>
            {props.deckDataLoaded ?
            <React.Fragment>
            <DialogContent dividers>
                <Typography gutterBottom>Selected List: <strong>{props.currentListName}</strong></Typography>
                <Typography >Choose Mode</Typography>
                <ButtonGroup
                    color="primary"
                    variant="outlined"
                    fullWidth
                >
                    <Button
                        variant={props.inputMode === 'Flashcard' ? 'contained' : null}
                        onClick={() => props.setInputMode('Flashcard')}
                    >Flashcard</Button>
                    <Button
                        variant={props.inputMode === 'Wordbank' ? 'contained' : null}
                        onClick={() => props.setInputMode('Wordbank')}
                    >Wordbank</Button>
                    <Button
                        variant={props.inputMode === 'Keyboard' ? 'contained' : null}
                        onClick={() => props.setInputMode('Keyboard')}
                    >Keyboard</Button>
                </ButtonGroup>
                <Typography >Choose Order</Typography>
                <ButtonGroup
                    color="primary"
                    orientation="vertical"
                    variant="outlined"
                    fullWidth
                >
                    <Button
                        variant={props.translateMode === '1to2' ? 'contained' : null}
                        onClick={() => props.setTranslationMode1()}
                    >{props.language1} to {props.language2}</Button>
                    <Button
                        variant={props.translateMode === '2to1' ? 'contained' : null}
                        onClick={() => props.setTranslationMode2()}
                    >{props.language2} to {props.language1}</Button>
                </ButtonGroup>
            </DialogContent>
            <Button
                // On Click
                    // Send value to getDeckData in App.js
                onClick={() => props.startDeck(props.currentListId)}
            >Start Deck</Button>
            </React.Fragment>
            :
            <CircularProgress style={{margin: "100px 150px"}} />
            }
        </Dialog>
    )
}