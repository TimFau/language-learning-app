import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';

export default function Nav(props) {

    const dispatch = useDispatch();
    const deckStarted = useSelector((state) => state.deckStarted);
    const userToken = useSelector((state) => state.token);
    let pathName = useLocation().pathname;

    function goToDeckSelector() {
        dispatch({type: 'deck/setDeckStarted', value: false});
        dispatch({type: 'deck/setDialog', value: false});
    }

    return (
        <AppBar position="static" color="primary">
            <ToolBar>
                {pathName === '/account' ?
                <Button
                    color="primary"
                >
                    <Link to="/">Home</Link>
                </Button>
                : '' }
                {deckStarted ?
                <Button
                    onClick={() => goToDeckSelector()}
                    color="primary"
                >Return to Deck Loader</Button>
                : ''}
                {pathName === '/' && !deckStarted ?
                <div>
                    <Button
                        onClick={() => dispatch({type: 'modals/setIntroOpen', value: true})}
                        color="primary"
                    >Open Tutorial</Button>
                    <Button
                        onClick={() => dispatch({type: 'deck/setDemoDrawer', value: true})}
                        color="primary"
                    >Load Demo Deck</Button>
                </div>
                : ''}
                {userToken === undefined ?
                <Button
                    onClick={() => dispatch({type: 'modals/setLoginOpen', value: true})}
                    color="primary"
                >Login</Button>
                : 
                <Button color="primary">
                    <Link to="/account">My Account</Link>
                </Button> }
            </ToolBar>
        </AppBar>
    )
};