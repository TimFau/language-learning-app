import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

let inputValue = '';

const keyBoard = (props) => {
    return(
        <Card className="keyboard-container">
            <CardContent>
                <Typography color="textSecondary">{props.children}</Typography>
                <h1 className="lang-from">"{props.langFrom[props.randomNum]}"</h1>
                {/* <h1 className="lang-to">"{props.langTo[props.randomNum]}"</h1> */}
                <TextField 
                    type="text" 
                    variant="outlined"
                    placeholder="Enter translation"
                    value={props.translationInputValue}
                    onChange={(e) => props.keyboardModeHandleChange(e)}
                    className="form-control"
                />
            </CardContent>
        </Card>
    )
}

export default keyBoard;
