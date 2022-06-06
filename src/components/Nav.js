import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Button } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import ToolBar from '@mui/material/Toolbar';

const useStyles = makeStyles({
    appBar: {
        "& .MuiToolbar-root": {
            display: "flex",
            // flexDirection: "column",
            // justifyContent: "center"
        },
        "& button": {
            color: "#fff"
        },
        "& .login": {
            justifySelf: "flex-end",
            marginLeft: "auto"
        }
    }
})

export default function Nav(props) {
    const dispatch = useDispatch();
    const deckStarted = useSelector((state) => state.deckStarted);
    const userToken = useSelector((state) => state.token);
    const classes = useStyles(props);
    let pathName = useLocation().pathname;

    function goToDeckSelector() {
        dispatch({type: 'deck/setDeckStarted', value: false});
        dispatch({type: 'deck/setDialog', value: false});
    }

    return (
        <AppBar position="static" color="primary" className={classes.appBar}>
            <ToolBar>
                {pathName === '/account' ?
                <Button>
                    <Link underline="hover" to="/">Home</Link>
                </Button>
                : '' }
                {deckStarted ?
                <Button onClick={() => goToDeckSelector()}
                >Return to Home</Button>
                : ''}
                {userToken === undefined ?
                <Button
                    onClick={() => dispatch({type: 'modals/setLoginOpen', value: true})}
                    className="login"
                >Login</Button>
                : 
                <Button
                    onClick={props.logout}
                    color="secondary"
                    className="login"
                >Logout</Button>
                }
            </ToolBar>
        </AppBar>
    )
}