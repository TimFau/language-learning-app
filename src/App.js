import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
import './App.scss';

const spreadsheetID  = "1DNL5d4bJXOdAMnWtQesxksF4aTDFjtAV5xnFVfVbc5w";
//const spreadsheetID = "1J9qvr4HrfVHcclbiW8jOCKzDZzu-mLwn8X0ne2EMB-w";
var langOneArr = [];
var langTwoArr = [];
var progressWidth = {};

class TranslationApp extends React.Component {
  	constructor(props) {
    	super(props);
    	this.state = {
			language1: '',
			language2: '',
			inputValue: ''
    	};
		this.getCard = this.getCard.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	  
	getData() {
		$.get("https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json", function(json) {
			$(json.feed.entry).each(function(){
				langOneArr.push(this.gsx$language1.$t);
				langTwoArr.push(this.gsx$langauge2.$t);
			})
			this.setState({
				language1: langOneArr.shift(),
				language2: langTwoArr.shift(),
				initialCount: langOneArr.length,
				randomNum: Math.floor(Math.random() * langOneArr.length),
				success: ''
			})
		}.bind(this));
	}
	
	getCard() {
		$('#root').removeClass('success').removeClass('incorrect');
		if (this.state.success === 'yes') {
			langOneArr.splice(this.state.randomNum, 1);
			langTwoArr.splice(this.state.randomNum, 1);
		}
		this.setState({
			randomNum: Math.floor(Math.random() * langOneArr.length),
			success: ''
		})
		progressWidth = {
			width: (this.state.initialCount - langOneArr.length) * (100 / this.state.initialCount) + '%'
		}
	}
	
	componentDidMount() {
		this.getData();
		this.getCard();
	}
	
	handleChange(event) {
		this.setState({inputValue: event.target.value})
	}
	
	handleSubmit(event) {
		event.preventDefault();
		if (this.state.inputValue.toLowerCase() === langTwoArr[this.state.randomNum].toLowerCase()) {
			$('#root').addClass('success');
			this.setState({success: 'yes'})
		} else if($('.success, .incorrect')[0]) {
			this.getCard();
		} else {
			$('#root').addClass('incorrect');
		}
		this.setState({
			inputValue: ''
		})

	}
	
	render() {
    	return (
			<div className="container main-container">
				<div className="container progress-container">
					<div className="progress">
						<div className="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow={this.state.initialCount - langOneArr.length} aria-valuemin="0" aria-valuemax={this.state.initialCount} style={progressWidth}></div>
					</div>
					<span>{langOneArr.length} out of {this.state.initialCount} words left</span>
				</div>
				<form onSubmit={this.handleSubmit} id="form">
					<h3>Write in {this.state.language2}:</h3>
					<h1>"{langOneArr[this.state.randomNum]}"</h1>
					<input type="text" placeholder="Enter translation" value={this.state.inputValue} onChange={this.handleChange} className="form-control"></input>
				</form>
				<div className="button-container">
					<button type="button" onClick={this.getCard} className="btn btn-lg btn-left">Skip</button>
					<button type="submit" value="submit" className="btn btn-primary btn-lg btn-right">Submit</button>
					<div className="alert alert-success container-fluid">
						<div className="message">
							<h4>Correct:</h4>
							<span>{langTwoArr[this.state.randomNum]}</span>
						</div>
						<button type="button" onClick={this.getCard} className="btn btn-success btn-lg">Continue</button>
					</div>
					<div className="alert alert-danger container-fluid">
						<div className="message">
							<h4>Correct answer:</h4>
							<span>{langTwoArr[this.state.randomNum]}</span>
						</div>
						<button type="button" onClick={this.getCard} className="btn btn-danger btn-lg">Continue</button>
					</div>
				</div>
			</div>
		)
	}
}

export default TranslationApp;