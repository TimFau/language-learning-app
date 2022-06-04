import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const cookies = new Cookies();

export default function Login(props) {

    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [userData, setUserData] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginOpen = useSelector((state) => state.loginOpen);
    const isNewUser = useSelector((state) => state.newUser);
    const dispatch = useDispatch();

    const apiToken = process.env.REACT_APP_API_TOKEN;
    const endpoint = 'https://d3pdj2cb.directus.app/graphql/system';

    function login() {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                mutation {
                    auth_login(
                        email: "${email}",
                        password: "${password}",
                        mode: cookie
                    ) {
                        access_token
                        refresh_token
                    }
                }
                `
            })
        })
        .then(async response => {
            const data = await response.json();
            setEmailError('');
            setPassError('');
            if(!response.ok) {
                const resError = (data && data.message) || response.status;
                return Promise.reject(resError);
            } else if (data.errors) {
                const errorMsgs = data.errors;
                for (let i = 0; i < errorMsgs.length; i++) {
                    let errorMsg = errorMsgs[i].message;
                    if(errorMsg.includes('Invalid user credentials')) {
                        setEmailError('Invalid username or password');
                        setPassError("Invalid username or password");
                    }
                    if(errorMsg.includes('email')) {
                        setEmailError('Please enter a valid email address');
                    }
                    if(errorMsg.includes('password')) {
                        setPassError("Please enter your password");
                    }
                    setError(errorMsg);
                }
                return false
            }
            console.log('userData', data, data.data.auth_login.access_token)
            let cookieExpires = new Date();
            cookieExpires.setMinutes(cookieExpires.getMinutes() + 20);
            cookies.set('token', data.data.auth_login.access_token, { path: '/', expires: cookieExpires });
            setError(null);
            setUserData(data);
            dispatch({type: 'user/setToken', value: data.data.auth_login.access_token})
            dispatch({type: 'modals/setLoginOpen', value: false})
            dispatch({type: 'user/setNewUser', value: false})
        })
        .catch(error => {
            setError(error);
            console.error('catch', error);
        })
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    return (
        <Dialog open={loginOpen} onClose={() => dispatch({type: 'modals/setLoginOpen', value: false})} className="login-dialog">
            <DialogTitle>
                {isNewUser ? 'Account Created!' : 'Login'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {isNewUser && 'Please login below'}
                </DialogContentText>
                <TextField 
                    autoFocus
                    margin="dense"
                    value={email}
                    onChange={handleEmail} 
                    error={emailError !== ''}
                    helperText={emailError}
                    label="Email Address"
                    fullWidth
                />
                <TextField 
                    margin="dense"
                    value={password}
                    onChange={handlePassword} 
                    error={passError !== ''}
                    helperText={passError}
                    label="Password"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => login()}
                    variant="contained"
                    color="primary"
                >Login</Button>
            </DialogActions>
        </Dialog>
    )
}