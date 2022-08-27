import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from 'hooks';

interface AddNewListModalProps {
    userId: string,
    addListDialogOpen: boolean,
    refreshLists: () => void,
    closeDialog: () => void,
}

export default function AddNewListModal(props: AddNewListModalProps) {

    const [deckName, setDeckName] = useState('');
    const [deckId, setDeckId] = useState('');
    const [deckErrorMsg, setDeckErrorMsg] = useState('');

    const userToken = useAppSelector((state) => state.token)
    const userId = props.userId
    const dialogOpen = props.addListDialogOpen;

    function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === 'DeckName') {
            setDeckName(event.target.value)
        } else if (event.target.name === 'DeckID') {
            setDeckId(event.target.value)
        }
    }

    function addNewList () {
        // Check if valid
        let request = "https://opensheet.vercel.app/" + deckId + "/Sheet1";
        fetch(request, {mode: 'cors'})
        .then( response => {
            if (response.status === 200) {
                setDeckErrorMsg('')
                sendPost()
            } else {
                setDeckErrorMsg('Unable to validate Sheet ID')
            }
        })
        .catch((error) => {
            console.error('Error', error)
        })
        // Add list to user_lists
        function sendPost() {
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
                    margin="normal"
                />
                <TextField
                    onChange={handleChange}
                    value={deckId}
                    id="addNewDeckID"
                    name="DeckID"
                    label="Deck ID"
                    type="text"
                    fullWidth
                    margin="normal"
                    error={deckErrorMsg !== ''}
                    helperText={deckErrorMsg}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={addNewList}>Add Deck</Button>
            </DialogActions>
        </Dialog>
    )
}