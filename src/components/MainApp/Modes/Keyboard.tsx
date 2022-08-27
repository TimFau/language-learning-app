import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const keyBoard = (props: any) => {
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
