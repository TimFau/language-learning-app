import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';

export default function Nav(props) {
      
    return (
        <AppBar position="static">
            <ToolBar>
                {props.deckStarted ?
                <Button
                    onClick={props.goToDeckSelector}
                    color="primary"
                >Change Deck</Button>
                : 
                <Button
                    onClick={() => props.introHandler(true)}
                    color="primary"
                >Open Tutorial</Button>
                }
            </ToolBar>
        </AppBar>
    )
}