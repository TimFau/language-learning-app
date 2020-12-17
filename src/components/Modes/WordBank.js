import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const flashCard = (props) => {
    return(
        <Card className="list-group word-bank">
            <CardContent>
                <Typography color="textSecondary">{props.children}</Typography>
                <Typography variant="h1">"{props.langFrom[props.randomNum]}"</Typography>
                {/* <Typography variant="h1">"{props.langTo[props.randomNum]}"</Typography> */}
            </CardContent>
            <CardActions>
            { props.wordBank.map((word, index) =>
                <Button
                    type="button"
                    className="list-group-item"
                    value={word}
                    onClick={(e) => props.keyboardModeHandleChange(e)}
                    color="primary"
                    variant="contained"
                    fullWidth
                    key={index}>
                        {word} 
                        {/* <a className="google-translate" href={"https://translate.google.com/#view=home&textMi%20chaimo%20Tim&text=" + word + "&op=translate&sl=it&tl=en"} target="_blank"><i className="material-icons">g_translate</i></a> */}
                </Button>
            ) }
            </CardActions>
        </Card>
    )
}

export default flashCard;


