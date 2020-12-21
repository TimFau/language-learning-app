import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';


export default function DeckSelector(props) {
    const [currentListName, setCurrentListName] = useState(null);
    const [currentListId, setCurrentListId] = useState(null);
    const [inputMode, setInputMode] = useState('Flashcard');
    const [customListInputValue, setCustomListInputValue] = useState(null);
    const [showTestLists, setShowTestLists] = useState(null);
    
    function deckOptions(listName, listId) {
        props.getData(listId)
        setCurrentListName(listName)
        setCurrentListId(listId)
    }

    function startDeck(listId) {
        props.switchInput(inputMode)
        props.startDeck()
    }

    function customListHandleChange(event) {
        setCustomListInputValue(event.target.value)
    }
    
    function handleShowTestLists(boolean) {
        setShowTestLists(boolean)
    }

    function deckDialog() {
        return (
            <Dialog open={props.deckDialogOpen} onClose={() => props.setDeckDialogOpen(false)} className="deck-dialog">
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
            <div className="lang-wrapper">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    className="deck-inputs-wrapper"
                >
                    <h1>Load Your Deck</h1>
                    <TextField 
                        value={customListInputValue}
                        onChange={customListHandleChange} 
                        error={props.deckLoadingError}
                        helperText={props.deckLoadingMsg}
                        variant="outlined"
                        label="Google Spreadsheet ID"
                        fullWidth
                    />
                    <Button
                        onClick={() => deckOptions('Custom List', customListInputValue)}
                        variant="contained"
                        color="primary"
                    >Load Deck</Button>
                </Grid>
                <div class="try-it">
                    {!showTestLists ? 
                    <div>
                        <p>Want to try it out first?</p>
                        <Button 
                            onClick={() => handleShowTestLists(!showTestLists)}
                            variant="contained"
                            color="secondary"
                        >Load a Demo Deck</Button>
                    </div>
                    :
                    <div>
                        <Button 
                            onClick={() => handleShowTestLists(!showTestLists)}
                            variant="contained"
                            color="secondary"
                        >X</Button>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                        >
                            <Card onClick={() => deckOptions('Italian Basics', '1DntQwj2nfvobtxkOExsSMm2DLHQNlzf2q48WhWlMqAM')}>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                    Italian Basics
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Select List</Button>
                                </CardActions>
                            </Card>
                            <Card onClick={() => deckOptions('Italian Other', '16PNgsOyvfz6BIpjCqHMtMWBg59qLhyj5TVvmXzSzmPA')}>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                    Italian Other
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Select List</Button>
                                </CardActions>
                            </Card>
                            <Card onClick={() => deckOptions('Spanish Basics', '1DNL5d4bJXOdAMnWtQesxksF4aTDFjtAV5xnFVfVbc5w')}>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                    Spanish
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Select List</Button>
                                </CardActions>
                            </Card>
                            <Card onClick={() => deckOptions('Test List', '1_qux2HIN3GhyYmaDF2KCg1JAAoe8c6xhPV228mR5hq8')}>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                    Test List
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Select List</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </div>
                    }
                </div>
            </div>
            { deckDialog() }
        </div>
    )
}