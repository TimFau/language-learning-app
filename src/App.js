import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './components/Nav';
import MainApp from './components/MainApp/MainApp';
import Account from './components/Account/Account';
import Login from './components/Modals/Login/Login';
import {getCookie} from './Helpers';
import Cookies from 'universal-cookie';

import './css/main.scss';

// Global Vars
const cookies = new Cookies();

class TranslationApp extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount () {
		if (getCookie('token')) {
			console.log('token cookie exists')
			this.props.setUserToken(cookies.get('token'));
		} else {
			console.log('token cookie does not exist')
		}
	}
	render() {
    	return (
			<BrowserRouter>
				<Nav />
				<Route path="/" exact component={MainApp} />
				<Route path="/language-learning-app" component={MainApp} />
				<Route path="/account" exact component={Account} />
				{/* Modals */}
				<Login />
			</BrowserRouter>
		)
	}
}

const mapDispatchToProps = dispatch => {
    return {
        setUserToken: (value) => dispatch({type: 'user/setToken', value: value})
    };
};

export default connect(null, mapDispatchToProps)(TranslationApp);