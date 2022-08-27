import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Card, CardActions, CardContent, Button, TextField, Icon } from '@mui/material/';
import ToolTip from '@mui/material/ToolTip'

interface DeckSelectorProps {
    deckLoadingError: boolean | undefined,
    deckLoadingMsg: string,
    deckOptions: (name: string, value: string) => void
}

export default function DeckSelector(props: DeckSelectorProps) {
    
    const [customListInputValue, setCustomListInputValue] = useState('');
    const dispatch = useDispatch();

    function customListHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCustomListInputValue(event.target.value)
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
                            onClick={() => props.deckOptions('Custom List', customListInputValue)}
                            variant="contained"
                            color="primary"
                        >Load Deck</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}
