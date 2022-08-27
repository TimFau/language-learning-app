/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks';
import { CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import UserLists from '../Account/UserLists';

const useStyles = makeStyles({
    wrapper: {
      marginTop: '25px'
    }
});

interface LoggedInProps {
    deckOptions: (listName: string, listId: string) => void
}

export default function account(props: LoggedInProps) {

    const userToken = useAppSelector((state) => state.token)
    const userName = useAppSelector((state) => state.userName)
    const [userId, setUserId] = useState('');
    const [isReady, setIsReady] = useState(false);
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const endpoint = 'https://d3pdj2cb.directus.app/graphql/system';

    function getAccountDetails() {
        fetch(endpoint + "?access_token=" + userToken, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                query {
                    users_me {
                        first_name
                        email
                        id
                    }
                }
                `
            })
        })
        .then(async response => {
            const data = await response.json();
            if(!response.ok) {
                console.log('bad response', response)
                const resError = (data && data.message) || response.status;
                dispatch({type: 'user/setToken', value: ''})
                dispatch({type: 'modals/setLoginOpen', value: true})
                dispatch({type: 'user/setNewUser', value: false})
                return Promise.reject(resError);
            }
                dispatch({type: 'user/setUserName', value: data.data.users_me.first_name})
                setUserId(data.data.users_me.id)
                setIsReady(true)
                return true
        })
        .catch(error => {
            console.error('catch', error);
        })
    }

    useEffect(function () {
        getAccountDetails();
    }) 
    
    
    return (
        <div className={classes.wrapper + ' wrapper'} id="account">
            {isReady ? 
            <div>
                <h1>Welcome, {userName}</h1>
                <UserLists userId={userId} deckOptions={props.deckOptions} />
            </div>
            :
            <CircularProgress />
            }
        </div>
    )
}