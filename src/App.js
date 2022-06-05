import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import MainApp from './components/MainApp/MainApp';
import {getCookie} from './Helpers';
import Cookies from 'universal-cookie';

import './css/main.scss';

// Global Vars
const cookies = new Cookies();

const theme = createTheme({
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
			this.props.setUserToken(cookies.get('token'));
		}
	}
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