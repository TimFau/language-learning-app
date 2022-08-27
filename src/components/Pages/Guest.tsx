import React from 'react';
import { useDispatch } from 'react-redux';

import { Paper, Card, TextField, Button, Link } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import { Alert } from '@mui/material';
import { CheckIsEmail } from '../../scripts/Helpers';
import hpBackground from '../../images/hp-background.jpg';

//
// This Page is served to guests or users that have been logged out
//

const apiToken = process.env.REACT_APP_API_TOKEN;
const endpoint = 'https://d3pdj2cb.directus.app/graphql/system';

const useStyles = makeStyles({
    paper: {
      background: "linear-gradient(0deg, rgba(18, 115, 230, 0.30), rgba(18, 115, 230, 0.15)), url(" + hpBackground + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
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
        marginLeft: "75px",
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
    },
    alert: {
        marginBottom: "25px"
    }
});

export default function GuestPage(props: object) {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [alertMsg, setAlertMsg] = React.useState('');
    const [fieldWithError, setFieldWithError] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'firstName':
                setFirstName(event.target.value);
                break;
            case 'lastName':
                setLastName(event.target.value);
                break;
            case 'email':
                setUserEmail(event.target.value);
                break;
            case 'password':
                setUserPassword(event.target.value);
                break;
            default:
                console.log('No match for event name')
        }
    }

    function validateFields () {
        if (firstName === '') {
            setFieldWithError('firstName')
            setAlertMsg('Please enter your first name.')
            return false
        } else if (lastName === '') {
            setFieldWithError('lastName')
            setAlertMsg('Please enter your last name.')
            return false
        } else if (userEmail === '') {
            setFieldWithError('email')
            setAlertMsg('Please enter your email address.')
            return false
        } else if (userPassword === '') {
            setFieldWithError('password')
            setAlertMsg('Please enter a password.')
            return false
        } else if (!CheckIsEmail(userEmail)) {
            setFieldWithError('email')
            setAlertMsg('Please enter a valid email address.')
            return false
        }
        setFieldWithError('')
        setAlertMsg('')
        return true
    }

    function createAccount() {
        if (validateFields()) {
            createAccountPost(apiToken)
        }
        function createAccountPost(apiToken: string | undefined) {
            fetch(endpoint + '?access_token=' + apiToken, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                        mutation {
                            create_users_item(
                                data: {
                                    first_name: "${firstName}",
                                    last_name: "${lastName}",
                                    email: "${userEmail}",
                                    password: "${userPassword}",
                                    status: "active",
                                    provider: "default",
                                    role:{
                                        id: "c8737b56-b42b-4796-adb0-d0fc6c1ede40"
                                        name: "User"
                                        app_access: true
                                        enforce_tfa: false
                                        admin_access: false
                                        icon: "supervised_user_circle"
                                    }
                                }
                            ) {
                                email
                                status
                            }
                        }
                    `
                })
            })
            .then(async response => {
                const data = await response.json();
                if(!response.ok) {
                    const resError = (data && data.message) || response.status;
                    return Promise.reject(resError);
                } else if (data.errors) {
                    console.log('error present', data.errors)
                    const errorMsgs = data.errors;
                    for (let i = 0; i < errorMsgs.length; i++) {
                        let errorMsg = errorMsgs[i].message
                        console.log(errorMsg)
                        if (errorMsg.includes('Field "email" has to be unique.')) {
                            setAlertMsg('You are already registered with this email address.')
                        } else if (errorMsg.includes('This value is not a valid email address.')) {
                            setAlertMsg('Please enter a valid email address.')
                            setFieldWithError('email')
                        } else {
                            setAlertMsg(errorMsg)
                            setFieldWithError('')
                        }
                    }
                    return false
                } else {
                    dispatch({type: 'user/setNewUser', value: true})
                    dispatch({type: 'modals/setLoginOpen', value: true})
                    setAlertMsg('')
                    return true
                }
            })
            .catch(error => {
                console.error('catch', error);
            })
        }
    }
    return (
        <Paper elevation={0} square={true} className={classes.paper}>
            <div className={classes.copy}>
                <h1>Easy to Use Flashcards <span className={classes.span}>For Learning New Languages</span></h1>
                <p>Create your own flashcards, work banks, and quizzes; all with one deck.</p>
                <div className={classes.howItWorks}>
                    <span>See how it works:</span> <Button variant="contained" onClick={() => dispatch({type: 'deck/setDemoDrawer', value: true})}>Load demo Deck</Button>
                </div>
            </div>
            <Card className={classes.form}>
                <h3>Create an account</h3>
                <form>
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
                        value={firstName}
                        onChange={handleChange}
                        error={fieldWithError === 'firstName'}
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
                        value={lastName}
                        onChange={handleChange}
                        error={fieldWithError === 'lastName'}
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
                        value={userEmail}
                        onChange={handleChange}
                        error={fieldWithError === 'email'}
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
                        value={userPassword}
                        onChange={handleChange}
                        error={fieldWithError === 'password'}
                    />
                </form>
                {alertMsg !== '' &&
                    <Alert severity="warning" className={classes.alert}>{alertMsg}</Alert>
                }
                <Button variant="contained" color="primary" fullWidth onClick={() => createAccount()}>Submit</Button>
                <div>
                    <Link underline="hover" onClick={() => dispatch({type: 'modals/setLoginOpen', value: true})}><span className="acctTxt">Already have an account?</span> <span className="signIn">LOGIN</span></Link>
                </div>
            </Card>
        </Paper>
    )
}