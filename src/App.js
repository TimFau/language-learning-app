import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import MainApp from './components/MainApp/MainApp';
import {getCookie} from './Helpers';
import Cookies from 'universal-cookie';

import './css/main.scss';

// Global Vars
const cookies = new Cookies();

const theme = createMuiTheme({
	palette: {
	  primary: {
		light: '#80c2ff',
		main: '#1273E6',
		dark: '#0065bd',
		contrastText: '#fff',
	  },
	  secondary: {
		light: '#4e5486',
		main: '#212c59',
		dark: '#00002f',
		contrastText: '#fff',
	  },
	  white: {
		  main: "#fff"
	  }
	},
});

class TranslationApp extends React.Component {
	componentDidMount () {
		if (getCookie('token')) {
			console.log('token cookie exists')
			this.props.setUserToken(cookies.get('token'));
		} else {
			console.log('token cookie does not exist')
		}
	}
	// logout() {
	// 	cookies.remove('token');
	// 	setUserData(null);
	// 	dispatch({type: 'user/setToken', value: null})
	// };
	render() {
    	return (
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<MainApp />
				</ThemeProvider>
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