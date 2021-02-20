import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Tutorial from '../../Modals/Tutorial';
import DemoDeck from './DemoDecks';
import { Card, CardActions, CardContent, Button, ButtonGroup, Typography, DialogTitle, DialogContent, Dialog, TextField, Icon, Drawer } from '@material-ui/core/';
import ToolTip from '@material-ui/core/ToolTip'

export default function DeckSelector(props) {
    const [currentListName, setCurrentListName] = useState(null);
    const [currentListId, setCurrentListId] = useState(null);
    const [inputMode, setInputMode] = useState('Flashcard');
    const [customListInputValue, setCustomListInputValue] = useState('');

    const dispatch = useDispatch();

    const demoDrawerOpen = useSelector((state) => state.demoDrawerOpen);
    const deckDialogOpen = useSelector((state) => state.deckDialogOpen);
    
    function deckOptions(listName, listId) {
        props.getData(listId)
        setCurrentListName(listName)
        setCurrentListId(listId)
        dispatch({type: 'deck/setDemoDrawer', value: false});
        dispatch({type: 'deck/setDialog', value: true})
    }

    function startDeck(listId) {
        props.switchInput(inputMode)
        dispatch({type: 'deck/setDeckStarted', value: true})
    }

    function customListHandleChange(event) {
        setCustomListInputValue(event.target.value)
    }

    function deckDialog() {
        return (
            <Dialog open={deckDialogOpen} onClose={() => dispatch({type: 'deck/setDialog', value: false})} className="deck-dialog">
                <DialogTitle id="simple-dialog-title">Deck Options</DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>Selected List: <strong>{currentListName}</strong></Typography>
                    <Typography >Choose Mode</Typography>
                    <ButtonGroup
                        color="primary"
                        variant="outlined"
                        fullWidth
                    >
                        <Button
                            variant={inputMode === 'Flashcard' ? 'contained' : null}
                            onClick={() => setInputMode('Flashcard')}
                        >Flashcard</Button>
                        <Button
                            variant={inputMode === 'Wordbank' ? 'contained' : null}
                            onClick={() => setInputMode('Wordbank')}
                        >Wordbank</Button>
                        <Button
                            variant={inputMode === 'Keyboard' ? 'contained' : null}
                            onClick={() => setInputMode('Keyboard')}
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
                        // Send value to getData in App.js
                    onClick={() => startDeck(currentListId)}
                >Start Deck</Button>
            </Dialog>
        )
    }

    return (
        <div className="wrapper deck-selector">
            <div className="main-content">
                <Card className="lang-wrapper">
                    <ToolTip title="Info">
                        <Icon color="primary" onClick={() => dispatch({type: 'modals/setIntroOpen', value: true})}>info</Icon>
                    </ToolTip>
                    <CardContent>
                        <h1>Load Your Deck</h1>
                        <TextField 
                            value={customListInputValue}
                            onChange={customListHandleChange} 
                            error={props.deckLoadingError}
                            helperText={props.deckLoadingMsg}
                            variant="outlined"
                            label="Google Spreadsheet ID"
                        />
                    </CardContent>
                    <CardActions className="deck-load-buttons">
                        <Button
                            onClick={() => deckOptions('Custom List', customListInputValue)}
                            variant="contained"
                            color="primary"
                        >Load Deck</Button>
                    </CardActions>
                </Card>
            </div>
            
            { deckDialog() }
            <Tutorial />
            <DemoDeck 
                deckOptions={deckOptions}
                open={demoDrawerOpen}
                onClose={() => dispatch({type: 'deck/setDemoDrawer', value: false})}
            />
        </div>
    )
}
