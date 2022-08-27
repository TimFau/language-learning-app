import { useAppSelector, useAppDispatch } from 'hooks'; 
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Button } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import ToolBar from '@mui/material/Toolbar';

const useStyles = makeStyles({
    appBar: {
        "& .MuiToolbar-root": {
            display: "flex",
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


export default function Nav(props: any) {
    const dispatch = useAppDispatch();
    const deckStarted = useAppSelector((state) => state.deckStarted);
    const userToken = useAppSelector((state) => state.token);
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
                    <Link to="/">Home</Link>
                </Button>
                : '' }
                {deckStarted ?
                <Button onClick={() => goToDeckSelector()}
                >Exit Deck</Button>
                : ''}
                {userToken === '' ?
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