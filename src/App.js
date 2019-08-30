import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
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
			inputMode: 'Flashcard',
			translateMode: '1to2',
			langFrom: '',
			langTo: ''
    	};
		this.getCard = this.getCard.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.switchInput = this.switchInput.bind(this);
		this.switchTranslationMode = this.switchTranslationMode.bind(this);
		this.showAnswerFc = this.showAnswerFc.bind(this);
		this.archiveCard = this.archiveCard.bind(this);
		this.setList = this.setList.bind(this);
	}
	  
	getData(value) {
		// Set default list
		if (value === undefined) {
			value = "1DntQwj2nfvobtxkOExsSMm2DLHQNlzf2q48WhWlMqAM"
		}
		$.get("https://spreadsheets.google.com/feeds/list/" + value + "/od6/public/values?alt=json", function(json) {
			langOneArr = [];
			langTwoArr = [];
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
			this.getCard();
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
			inputValue: '',
			langFrom: this.state.translateMode === '1to2' ? langOneArr : langTwoArr,
			langTo: this.state.translateMode === '1to2' ? langTwoArr : langOneArr,
		}));
		this.handleWordBank();
		progressWidth = {
			width: (this.state.initialCount - langOneArr.length) * (100 / this.state.initialCount) + '%'
		}
	}

	archiveCard() {
		langOneArr.splice(this.state.randomNum, 1);
		langTwoArr.splice(this.state.randomNum, 1);
		$('.main-container').removeClass('show-answer');
		this.getCard();
	}

	handleWordBank() {
		this.setState((state) => {
			if(this.state.translateMode === '1to2'){
				return {
					wordBank: wordBankHelper(state.randomNum,  state.randomnNum2, langTwoArr, langTwoArrInit)
				}
			} else {
				return {
					wordBank: wordBankHelper(state.randomNum,  state.randomnNum2, langOneArr, langOneArrInit)
				}
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
		else if (this.state.inputValue.toLowerCase().trim() === this.state.langTo[this.state.randomNum].toLowerCase().trim()) {
			$('#root').addClass('success');
			this.setState({success: 'yes'})
		}  else {
			$('#root').addClass('incorrect');
		}
	}

	switchInput(value) {
		if(value === 'Wordbank' && this.state.inputMode !== 'Wordbank'){
			this.setState({
				inputMode: 'Wordbank'
			})
		} else if(value === 'Keyboard' && this.state.inputMode !== 'Keyboard'){
			this.setState({
				inputMode: 'Keyboard'
			})
		} else if(value === 'Flashcard' && this.state.inputMode !== 'Flashcard'){
			this.setState({
				inputMode: 'Flashcard'
			})
		}
	}

	switchTranslationMode() {
		if(this.state.translateMode === '1to2'){
			this.setState({
				translateMode: '2to1'
			})
		} else {
			this.setState({
				translateMode: '1to2'
			})
		}
		this.getCard();
	}

	showAnswerFc() {
		$('.main-container').toggleClass('show-answer');
	}

	setList(value) {
		alert(value);
		if (value === 'es-basics') {
			const spreadsheetID = "1DNL5d4bJXOdAMnWtQesxksF4aTDFjtAV5xnFVfVbc5w";
			this.getData(spreadsheetID);
			this.getCard();
		} else if (value === 'it-basics') {
			const spreadsheetID  = "1DntQwj2nfvobtxkOExsSMm2DLHQNlzf2q48WhWlMqAM";
			this.getData(spreadsheetID);
		} else if (value === 'it-other') {
			const spreadsheetID  = "16PNgsOyvfz6BIpjCqHMtMWBg59qLhyj5TVvmXzSzmPA";
			this.getData(spreadsheetID);
		}
	}

	componentWillMount() {
		this.getData();
	}
	
	render() {
    	return (
			<div className={"container main-container " + this.state.inputMode}>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="#">Options</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							{/* <li className="nav-item active">
								<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
							</li> */}
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select List</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<span className="dropdown-item"  onClick={(value) => this.setList('it-basics')}>Italian Basics</span>
									<span className="dropdown-item" onClick={(value) => this.setList('it-other')}>Italian Other</span>
									<span className="dropdown-item" onClick={(value) => this.setList('es-basics')}>Spanish</span>
								</div>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Input Mode</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<span className="dropdown-item" onClick={(Keyboard) => this.switchInput('Keyboard')}>Keyboard</span>
									<span className="dropdown-item" onClick={(Keyboard) => this.switchInput('Wordbank')}>Wordbank</span>
									<span className="dropdown-item" onClick={(Keyboard) => this.switchInput('Flashcard')}>Flashcard</span>
								</div>
							</li>
						</ul>
					</div>
				</nav>
				<div className="container progress-container">
					<div className="progress">
						<div className="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow={this.state.initialCount - langOneArr.length} aria-valuemin="0" aria-valuemax={this.state.initialCount} style={progressWidth}></div>
					</div>
					<span>{langOneArr.length} out of {this.state.initialCount} words left</span>
				</div>
				<form onSubmit={this.handleSubmit} id="form">
					<h3 onClick={this.switchTranslationMode}>Translate to <span><i className="material-icons switch-icon">swap_horiz</i>{this.state.translateMode === "1to2" ? this.state.language2 : this.state.language1}</span>:</h3>
					<h1 className="lang-from">"{this.state.langFrom[this.state.randomNum]}"</h1>
					{this.state.inputMode === 'Flashcard' && [
						<h1 className="lang-to">"{this.state.langTo[this.state.randomNum]}"</h1>,
						<i className="material-icons swap-card" onClick={this.showAnswerFc}>swap_vertical_circle</i>,
						<i className="material-icons navigate-next" onClick={this.getCard}>navigate_next</i>,
						<i className="material-icons archive" onClick={this.archiveCard}>archive</i>
					]}
					{<input type="text" placeholder="Enter translation" value={this.state.inputValue} onChange={this.handleChange} className="form-control"></input>}
					<div className="list-group word-bank">
						{
						this.state.wordBank.map((word) =>
						<button type="button" className="list-group-item" value={word}  onClick={this.handleChange}>{word} <a className="google-translate" href={"https://translate.google.com/#view=home&textMi%20chaimo%20Tim&text=" + word + "&op=translate&sl=it&tl=en"} target="_blank"><i className="material-icons">
						g_translate
						</i></a></button>
						)}
					</div>
				</form>
				<div className="button-container">
					<button type="button" onClick={this.getCard} className="btn btn-lg btn-left">Skip</button>

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