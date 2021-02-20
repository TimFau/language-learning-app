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
    const dispatch = useDispatch();

    function login() {
        fetch("http://localhost:8080/languageApp/auth/authenticate", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then(async response => {
            const data = await response.json();
            setEmailError('');
            setPassError('');
            if(!response.ok) {
                const resError = (data && data.message) || response.status;
                const errorMsg = data.error.message;
                setError(errorMsg);
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
                return Promise.reject(resError);
            }
            let cookieExpires = new Date();
            cookieExpires.setMinutes(cookieExpires.getMinutes() + 20);
            console.log('cookieExpires')
            cookies.set('token', data.data.token, { path: '/', expires: cookieExpires });
            setError(null);
            setUserData(data);
            dispatch({type: 'user/setToken', value: data.data.token})
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
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    If you don't have an account, click here to register.
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