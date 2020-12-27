import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';

export default function Nav(props) {
      
    return (
        <AppBar position="static" color="primary">
            <ToolBar>
                {props.deckStarted ?
                <Button
                    onClick={props.goToDeckSelector}
                    color="primary"
                >Return to Deck Loader</Button>
                :
                <div>
                    <Button
                        onClick={() => props.introHandler(true)}
                        color="primary"
                    >Open Tutorial</Button>
                    <Button
                        onClick={() => props.toggleDemoDrawer(true)}
                        color="primary"
                    >Load Demo Deck</Button>
                </div>
                }
            </ToolBar>
        </AppBar>
    )
}