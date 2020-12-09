import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';

export default function Nav(props) {
      
    return (
        <AppBar position="static">
            <ToolBar>
                <Button
                    onClick={props.goToDeckSelector}
                    variant="link"
                    color="primary"
                >Change Deck</Button>
            </ToolBar>
        </AppBar>
    )
}