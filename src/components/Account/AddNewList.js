import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddNewListModal(props) {

    const [deckName, setDeckName] = useState('');
    const [deckId, setDeckId] = useState('');

    const userToken = useSelector((state) => state.token)
    const userId = props.userId
    const dialogOpen = props.addListDialogOpen;

    function handleChange (event) {
        if (event.target.name === 'DeckName') {
            setDeckName(event.target.value)
        } else if (event.target.name === 'DeckID') {
            setDeckId(event.target.value)
        }
    }

    function addNewList () {
        let listsUrl = "https://d3pdj2cb.directus.app/graphql?access_token=" + userToken;
        fetch(listsUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                mutation {
                    create_User_lists_item (data: {
                        status: "published",
                        list_name: "${deckName}" ,
                        list_id: "${deckId}"
                        user_id: "${userId}"
                    }) {
                        status
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
                console.log('new list result', result)
                props.refreshLists();
                handleClose()
            },
            (error) => {
                console.log(error);
            }
        )
    }

    function handleClose() {
        props.closeDialog();
    }
    
    return (
        <Dialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle>
                Add New Deck
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please choose a name for your new deck and enter the Google spreadsheet ID below.
                </DialogContentText>
                <TextField
                    onChange={handleChange}
                    value={deckName}
                    autoFocus
                    id="addNewDeckListName"
                    name="DeckName"
                    label="Deck Name"
                    type="text"
                    fullWidth
                />
                <TextField
                    onChange={handleChange}
                    value={deckId}
                    id="addNewDeckID"
                    name="DeckID"
                    label="Deck ID"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={addNewList}>Add Deck</Button>
            </DialogActions>
        </Dialog>
    )
}