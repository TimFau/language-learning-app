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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newList, setNewList] = useState(false);
    const [currentList, setCurrentList] = useState(null);
    const [currentListId, setCurrentListId] = useState(null);
    const [inputMode, setInputMode] = useState('Flashcard');
    const [customListInputValue, setCustomListInputValue] = useState(null);
    
    function deckOptions(listName, listId) {
        setCurrentList(listName)
        setCurrentListId(listId)
        setNewList(false)
        setDialogOpen(true)
    }

    function addNewList() {
        setNewList(true)
        setDialogOpen(true)
    }

    function startDeck(listId) {
        props.switchInput(inputMode)
        props.setList(listId)
    }

    function customListHandleChange(event) {
        console.log(event)
        console.log(event.target.value)
        setCustomListInputValue(event.target.value)
	}

    function deckDialog() {
        return (
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="deck-dialog">
                <DialogTitle id="simple-dialog-title">{ newList ? 'Load new' : 'Deck Options' }</DialogTitle>
                <DialogContent dividers>
                    {!newList ? 
                        <Typography gutterBottom>Selected List: <strong>{currentList}</strong></Typography>
                    : 
                        <TextField 
                            value={customListInputValue}
                            onChange={customListHandleChange} 
                            variant="outlined"
                            label="Google Spreadsheet ID"
                            fullWidth
                        />
                    }
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
                {!newList ? 
                    <Button
                        // On Click
                            // Send value to setList in App.js
                        onClick={() => startDeck(currentListId)}
                    >Start Deck</Button>
                : 
                    <Button
                        onClick={(value) => props.setList(customListInputValue)}
                    >Load</Button>
                }
            </Dialog>
        )
    }

    return (
        <div className="wrapper deck-selector">
            <div className="lang-wrapper">
                <h1>Choose a Deck</h1> 
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
                            <Button size="small" color="palette.secondary.dark">Select List</Button>
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
                <Button onClick={() => addNewList()}>Load Custom</Button>
            </div>
            { deckDialog() }
            {/* { loadNewDialog() } */}
        </div>
    )
}