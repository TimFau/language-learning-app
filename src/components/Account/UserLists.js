import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardActions, CardContent, Button, Typography, CircularProgress } from '@material-ui/core/';

export default function UserLists(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const userToken = useSelector((state) => state.token)
    const userId = props.userId
  
    useEffect(() => {
        let listsUrl = "http://localhost:8080/languageApp/items/list_collection?access_token=" + userToken + "&filter[user_id]=" + userId;
        fetch(listsUrl)
        .then(res => res.json())
        .then(
        (result) => {
            setIsLoaded(true);
            setItems(result.data);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
            console.log(error);
        }
        )
    }, [userToken, userId])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <CircularProgress />;
    } else if (items) {
      return (
        <div id="userListsContainer">
            <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={2}
            >
                {items.map(item => (
                    <Card onClick={() => props.deckOptions(item.list_name, item.list_id)} key={item.id} style={{margin: 10}}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                            {item.list_name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Select List</Button>
                        </CardActions>
                    </Card>
                ))}
            </Grid>
            <Button size="large">Add New</Button>
        </div>
      )
    } else {
        return 'Error'
    }
  }