import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardActions, CardContent, Button, Typography, CircularProgress } from '@mui/material/';
import AddNewListComponent from './AddNewList';

export default function UserLists(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [addListDialogOpen, setAddListDialogOpen] = useState(false);
    const userToken = useSelector((state) => state.token)
    const userId = props.userId

    function getUsersLists (userToken, userId) {
        let listsUrl = "https://d3pdj2cb.directus.app/graphql?access_token=" + userToken;
        fetch(listsUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        User_lists(filter: {
                            user_id: {
                                id: {
                                    _eq: "${userId}"
                                }
                            }
                        }) {
                            id
                            status
                            date_created
                            list_name
                            list_id
                            user_id {
                                id
                            }
                        }
                    }
                `
            })
        })
        .then(res => res.json())
        .then(
        (result) => {
            setIsLoaded(true);
            setItems(result.data.User_lists);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
            console.log(error);
        }
        )
    }
  
    useEffect(() => {
        getUsersLists(userToken, userId)
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
            <Button size="large" onClick={() => setAddListDialogOpen(true)}>Add New</Button>
            <AddNewListComponent userId={userId} addListDialogOpen={addListDialogOpen} closeDialog={() => setAddListDialogOpen(false)} refreshLists={() => getUsersLists(userToken, userId)} />
        </div>
      )
    } else {
        return 'Error'
    }
  }