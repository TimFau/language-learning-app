import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const flashCard = (props: any) => {
    return(
        <Card className="list-group word-bank">
            <CardContent>
                <Typography color="textSecondary">{props.children}</Typography>
                <Typography variant="h1">"{props.langFrom[props.randomNum]}"</Typography>
                {/* <Typography variant="h1">"{props.langTo[props.randomNum]}"</Typography> */}
            </CardContent>
            <CardActions>
            { props.wordBank.map((word: any, index: any) =>
                <Button
                    type="button"
                    className="list-group-item"
                    value={word}
                    onClick={(e) => props.keyboardModeHandleChange(e)}
                    color="primary"
                    variant="contained"
                    fullWidth
                    key={index}
                >
                        {word} 
                        {/* <a className="google-translate" href={"https://translate.google.com/#view=home&textMi%20chaimo%20Tim&text=" + word + "&op=translate&sl=it&tl=en"} target="_blank"><i className="material-icons">g_translate</i></a> */}
                </Button>
            ) }
            </CardActions>
        </Card>
    )
}

export default flashCard;


