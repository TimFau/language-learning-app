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
import Tutorial from './Tutorial';
import Icon from '@material-ui/core/Icon';
import ToolTip from '@material-ui/core/ToolTip';
import Drawer from '@material-ui/core/Drawer';


export default function DeckSelector(props) {
    const [currentListName, setCurrentListName] = useState(null);
    const [currentListId, setCurrentListId] = useState(null);
    const [inputMode, setInputMode] = useState('Flashcard');
    const [customListInputValue, setCustomListInputValue] = useState('');
    
    function deckOptions(listName, listId) {
        props.getData(listId)
        setCurrentListName(listName)
        setCurrentListId(listId)
        props.toggleDemoDrawer(false)
    }

    function startDeck(listId) {
        props.switchInput(inputMode)
        props.startDeck()
    }

    function customListHandleChange(event) {
        setCustomListInputValue(event.target.value)
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
            <div className="main-content">
                <Card className="lang-wrapper">
                    <ToolTip title="Info">
                        <Icon color="primary" onClick={() => props.introHandler(true)}>info</Icon>
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
            <Tutorial 
                introOpen={props.introOpen}
                introHandler={props.introHandler}
                toggleDemoDrawer={props.toggleDemoDrawer}
            />
            <Drawer anchor="bottom" open={props.demoDrawerOpen} onClose={() => props.toggleDemoDrawer(false)} className="demo-drawer">
                <Grid
                    container
                    direction="row"
                    justify="center"
                >
                    <Card onClick={() => deckOptions('Top 100 French', '1gHgH-O7K2YOPzI0VFSBpGqqGX6YdO4bO6AMjBfEaQ4M')}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                            Top 100 French
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Select List</Button>
                        </CardActions>
                    </Card>
                    <Card onClick={() => deckOptions('Top 100 Italian', '1RLHRTSRMoierkjBUCZD2ViXr17ScwLz8ghPheBG8GEQ')}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                            Top 100 Italian
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Select List</Button>
                        </CardActions>
                    </Card>
                    <Card onClick={() => deckOptions('Top 100 Spanish', '123uJsttzL6EmedjHzR2n8LSVFljlu1ZRVW84K5h74wI')}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                            Top 100 Spanish
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Select List</Button>
                        </CardActions>
                    </Card>
                    <Card onClick={() => deckOptions('Top 10 Spanish', '1fyA1Ce3nvtvCESzL67uUSCLkmE-Z9c0LGHFc8fE0oa4')}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                            Top 10 Spanish
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Select List</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Drawer>
        </div>
    )
}