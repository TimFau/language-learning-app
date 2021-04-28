import React from 'react';
import {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paper, Card, makeStyles, TextField, Button, FormControl, Link } from '@material-ui/core/';
import hpBackground from '../images/hp-background.jpg'

const useStyles = makeStyles({
    paper: {
      background: "linear-gradient(0deg, rgba(18, 115, 230, 0.85), rgba(18, 115, 230, 0.85))," + "url(" + hpBackground + ")",
      backgroundSize: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    copy: {
        color: "#fff",
        maxWidth: "40%",
        marginTop: "-20px",
        textAlign: "left",
        '& h1': {
            margin: "0",
            fontWeight: "800",
            fontSize: "2.6vw",
            lineHeight: "48px"
        },
        "& p": {
            marginTop: "8px"
        },
        '& button': {
            margin: "0 5px",
            padding: "8px 25px"
        }
    },
    howItWorks: {
        marginTop: "40px",
        display: "flex",
        alignItems: "center",
        "& > span": {
            fontSize: "26px",
            fontWeight: "200",
            marginRight: "20px"
        }
    },
    span: {
        display: "inline-block"
    },
    form: {
        marginRight: "75px",
        padding: "15px 40px 35px 40px",
        "& h3": {
            textAlign: "left",
            fontWeight: "200",
            fontSize: "29px",
            color: "#1273E6",
            margin: "10px 0 25px 0"
        },
        "& .input": {
            marginBottom: "25px",
            // maxWidth: "325px",
            display: "block"
        },
        "& a": {
            textAlign: "right",
            width: "100%",
            fontWeight: "600",
            display: "block",
            marginTop: "20px",
            fontSize: "14px",
            "& .acctTxt": {
                float: "left",
                color: "black"
            },
            "& .signIn": {
                cursor: "pointer"
            }
        }
    }
});

export default function LandingPage(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    function createAccount() {
        fetch("http://localhost:8080/languageApp/auth/authenticate", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": "accountcreator@timfau.com",
                "password": "7777777"
            })
        })
        .then(async response => {
            const data = await response.json();
            console.log(data)
            const token = data.data.token
            if(!response.ok) {
                const resError = (data && data.message) || response.status;
                // const errorMsg = data.error.message;
                return Promise.reject(resError);
            } else {
                console.log(token)
                createAccountPost(token) 
            }
        })
        function createAccountPost(token) {
            fetch("http://localhost:8080/languageApp/users?access_token=" + token, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "first_name": "Ben3",
                    "last_name": "Haynes3",
                    "email": "demo3@example.com",
                    "password": "d1r3ctu5",
                    "role": 3,
                    "status": "active"
                })
            })
            .then(async response => {
                const data = await response.json();
                if(!response.ok) {
                    const resError = (data && data.message) || response.status;
                    // const errorMsg = data.error.message;
                    return Promise.reject(resError);
                }
                // setError(null);
            })
            .catch(error => {
                // setError(error);
                console.error('catch', error);
            })
        }
    }
    return (
        <Paper elevation={0} square height="100%" className={classes.paper}>
            <Card className={classes.form}>
                <h3>Create an account</h3>
                <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                id="firstName"
                className="input"
                fullWidth
                label="First Name"
                autoFocus
                />
                <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                className="input"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                />
                <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                className="input"
                label="Email Address"
                name="email"
                autoComplete="email"
                />
                <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                className="input"
                autoComplete="current-password"
                />
                <Button variant="contained" color="primary" fullWidth onClick={() => createAccount()}>Submit</Button>
                <div>
                    <Link onClick={() => dispatch({type: 'modals/setLoginOpen', value: true})}><span className="acctTxt">Already have an account?</span> <span className="signIn">SIGN IN</span></Link>
                </div>
            </Card>
            <div className={classes.copy}>
                <h1>Easy to Use Flashcards <span className={classes.span}>For Learning New Languages</span></h1>
                <p>Create your own flashcards, work banks, and quizzes; all with one deck.</p>
                <div className={classes.howItWorks}>
                    <span>See how it works:</span> <Button variant="contained" onClick={() => dispatch({type: 'deck/setDemoDrawer', value: true})}>Load demo Deck</Button>
                </div>
            </div>
        </Paper>
    )
}