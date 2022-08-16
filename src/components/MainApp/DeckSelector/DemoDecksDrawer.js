import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Drawer, CardActions, CardContent, Button, Typography }  from '@mui/material';

//
// This drawer contains decks that are available for guest users to try out the app
//

export default function DemoDecks(props) {
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    
    const apiToken = process.env.REACT_APP_API_TOKEN;
    const endpoint = 'https://d3pdj2cb.directus.app/graphql';

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch(endpoint + '?access_token=' + apiToken, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        Demo_Lists {
                            id
                            list_name
                            list_id
                        }
                    }
                `
            })
        })
        .then(res => res.json())
        .then(
        (result) => {
            setItems(result.data.Demo_Lists);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            setError(error);
            console.log(error);
        }
        )
    }, [apiToken])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <Drawer anchor="bottom" open={props.open} onClose={props.onClose} className="demo-drawer">
            <Grid
                container
                direction="row"
                justifyContent="center"
            >
                {items.map(item => (
                    <Card onClick={() => props.deckOptions(item.list_name, item.list_id)} key={item.id}>
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
        </Drawer>
      )
    }
  }