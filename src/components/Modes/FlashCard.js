import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const flashCard = (props) => {
    return(
        <Card className="flash-card-container">
            {props.showAnswer ? (
                <CardContent>
                    <Typography color="textSecondary">Answer</Typography>
                    <h1 className="lang-to">"{props.langTo[props.randomNum]}"</h1>
                    <div className="btn-container flipped">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={props.getCard}
                        >I got it wrong</Button >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.archiveCard}
                        >I got it right</Button >
                    </div>
                </CardContent>
            ) : (
                <CardContent onClick={props.showAnswerFc}>
                    <Typography color="textSecondary">{props.children}</Typography>
                    <h1 className="lang-from">"{props.langFrom[props.randomNum]}"</h1>
                    <div className="btn-container">
                        <Button
                            variant="contained"
                            color="primary"
                        >See Answer</Button >
                    </div>
                </CardContent>
            )}
        </Card>
    )
}

export default flashCard;
