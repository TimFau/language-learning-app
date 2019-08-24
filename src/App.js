import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
import './App.scss';
// import {shuffle} from './Functions';
import {wordBankHelper} from './Functions';

const spreadsheetID  = "1DntQwj2nfvobtxkOExsSMm2DLHQNlzf2q48WhWlMqAM"; // Italian
//const spreadsheetID  = "1DNL5d4bJXOdAMnWtQesxksF4aTDFjtAV5xnFVfVbc5w"; // Spanish Full
//const spreadsheetID = "1J9qvr4HrfVHcclbiW8jOCKzDZzu-mLwn8X0ne2EMB-w"; // Spanish Test
var langOneArr = [];
var langTwoArr = [];
var progressWidth = {};
var langOneArrInit = [];
var langTwoArrInit = [];

class TranslationApp extends React.Component {
  	constructor(props) {
    	super(props);
    	this.state = {
			language1: '',
			language2: '',
			inputValue: '',
			wordBank: [],
			inputMode: 'Word Bank'
    	};
		this.getCard = this.getCard.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.switchInput = this.switchInput.bind(this);
	}
	  
	getData() {
		$.get("https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json", function(json) {
			$(json.feed.entry).each(function(){
				langOneArr.push(this.gsx$language1.$t);
				langTwoArr.push(this.gsx$langauge2.$t);
			})
			this.setState(state => ({
				language1: langOneArr.shift(),
				language2: langTwoArr.shift(),
				initialCount: langOneArr.length,
				randomNum: Math.floor(Math.random() * langOneArr.length),
				randomNum2: (Math.floor(Math.random() * langOneArr.length) - 4),
				success: ''
			}))
			langOneArrInit = langOneArr;
			langTwoArrInit = langTwoArr;
			this.handleWordBank();
		}.bind(this));
	}
	
	getCard() {
		$('#root').removeClass('success').removeClass('incorrect');
		if (this.state.success === 'yes') {
			langOneArr.splice(this.state.randomNum, 1);
			langTwoArr.splice(this.state.randomNum, 1);
		}
		this.setState((state, props) =>  ({
			randomNum: Math.floor(Math.random() * langOneArr.length),
			randomNum2: Math.floor(Math.random() * langOneArrInit.length),
			success: '',
			inputValue: ''
		}));
		this.handleWordBank();
		progressWidth = {
			width: (this.state.initialCount - langOneArr.length) * (100 / this.state.initialCount) + '%'
		}
	}

	handleWordBank() {
		this.setState((state) => {
			// return {
			// 	wordBank: shuffle(langTwoArr.slice(state.randomNum2, state.randomNum2 + 3).concat(langTwoArr[state.randomNum]))
			// }
			return {
				wordBank: wordBankHelper(state.randomNum,  state.randomnNum2, langTwoArr, langTwoArrInit)
			}
		})
	}
	
	handleChange(event) {
		this.setState({inputValue: event.target.value})
	}
	
	handleSubmit(event) {
		event.preventDefault();
		if (this.state.success === 'yes' || $('.success, .incorrect')[0]) {
			this.getCard();
		}
		else if (this.state.inputValue.toLowerCase().trim() === langTwoArr[this.state.randomNum].toLowerCase().trim()) {
			$('#root').addClass('success');
			this.setState({success: 'yes'})
		}  else {
			$('#root').addClass('incorrect');
		}
	}

	switchInput() {
		$('.form-control, .word-bank').toggleClass('d-none');
		if(this.state.inputMode === 'Word Bank'){
			this.setState({
				inputMode: 'Keyboard'
			})
		} else {
			this.setState({
				inputMode: 'Word Bank'
			})
		}
	}

	componentWillMount() {
		this.getData();
		this.getCard();
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
					<h3>Translate to {this.state.language2}:</h3>
					<h1>"{langOneArr[this.state.randomNum]}"</h1>
					{<input type="text" placeholder="Enter translation" value={this.state.inputValue} onChange={this.handleChange} className="form-control d-none"></input>}
					<div className="list-group word-bank">
						{
						this.state.wordBank.map((word) =>
						<button type="button" className="list-group-item" value={word}  onClick={this.handleChange}>{word} <a href={"https://translate.google.com/#view=home&textMi%20chaimo%20Tim&text=" + word + "&op=translate&sl=it&tl=en"} target="_blank">GT</a></button>
						)}
					</div>
				</form>
				<div className="button-container">
					<button type="button" onClick={this.getCard} className="btn btn-lg btn-left">Skip</button>

					<button className="btn btn-lg btn-center btn-outline-secondary" onClick={this.switchInput}>{this.state.inputMode === 'Word Bank' ? 'Keyboard' : 'Word Bank'}</button>

					<button type="submit" value="submit" className="btn btn-lg btn-primary btn-right" onClick={this.handleSubmit}>Submit</button>
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