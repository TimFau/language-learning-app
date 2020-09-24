import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
//import logo from './logo.svg';
import './css/custom.scss';
import './css/main.scss';
import {wordBankHelper} from './Functions';
import Nav from './components/Nav';
import ProgressBar from './components/ProgressBar';
import Modals from './components/Modals';
import ButtonsContainer from './components/ButtonsContainer';

// global vars
var langOneArr = [];
var langTwoArr = [];
var progressWidth = {};
var langOneArrInit = [];
var langTwoArrInit = [];

class TranslationApp extends React.Component {
  	constructor(props) {
		super(props);
		// state initialization
    	this.state = {
			language1: '',
			language2: '',
			langFrom: '',
			langTo: '',
			translationInputValue: '',
			wordBank: [],
			customListInputValue: '',
			currentList: '',
			// set default state values
			translateMode: '1to2',
			inputMode: 'Flashcard',
			checkAccents: false
		};
		// bindings
		this.getCard = this.getCard.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.keyboardModehandleChange = this.keyboardModehandleChange.bind(this);
		this.switchInput = this.switchInput.bind(this);
		this.switchTranslationMode = this.switchTranslationMode.bind(this);
		this.showAnswerFc = this.showAnswerFc.bind(this);
		this.archiveCard = this.archiveCard.bind(this);
		this.setList = this.setList.bind(this);
		this.customListhandleChange = this.customListhandleChange.bind(this);
	}
	  
	getData(value) {
		// Set default list
		if (value === undefined) {
			value = "1DntQwj2nfvobtxkOExsSMm2DLHQNlzf2q48WhWlMqAM"
		}
		$.get("https://spreadsheets.google.com/feeds/list/" + value + "/od6/public/values?alt=json", function(json) {
			langOneArr = [];
			langTwoArr = [];
			progressWidth = {};
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
				success: '',
				currentList: value
			}))
			langOneArrInit = langOneArr.slice();
			langTwoArrInit = langTwoArr.slice();
			this.handleWordBank();
			this.getCard();
		}.bind(this)
		
		);
	}

	componentWillMount() {
		this.getData();
	}
	
	componentDidMount() {
		document.addEventListener("keydown", event => {
			// show card on space, up, or down
			if (event.isComposing || event.keyCode === 32 || event.keyCode === 40 || event.keyCode === 38) {
				this.showAnswerFc();
			}
			// archive card/skip on left or '~'
			if (event.isComposing || event.keyCode === 37 || event.keyCode === 192) {
				this.archiveCard();
			}
			// go to next card on right or 'enter'
			if (event.isComposing || event.keyCode === 39 || event.keyCode === 13) {
				if(this.state.inputMode === 'Flashcard') {
					this.getCard();
				} else {
					this.handleSubmit(event);
				}
			}
		});
	}
	
	getCard() {
		$('#root').removeClass('success').removeClass('incorrect').removeClass('show-answer');
		$('.modal').hide();
		if (this.state.success === 'yes') {
			langOneArr.splice(this.state.randomNum, 1);
			langTwoArr.splice(this.state.randomNum, 1);
		}
		this.setState((state, props) =>  ({
			randomNum: Math.floor(Math.random() * langOneArr.length),
			randomNum2: Math.floor(Math.random() * langOneArrInit.length),
			success: '',
			translationInputValue: '',
			langFrom: this.state.translateMode === '1to2' ? langOneArr : langTwoArr,
			langTo: this.state.translateMode === '1to2' ? langTwoArr : langOneArr,
		}));
		this.handleWordBank();
		progressWidth = {
			width: (this.state.initialCount - langOneArr.length) * (100 / this.state.initialCount) + '%'
		}
		if(langOneArr.length === 0){
			$('#success-modal').show();
		}
	}

	archiveCard() {
		langOneArr.splice(this.state.randomNum, 1) ;
		langTwoArr.splice(this.state.randomNum, 1);
		$('#root').removeClass('show-answer');
		this.getCard();
	}

	handleWordBank() {
		this.setState((state) => {
			if(this.state.translateMode === '1to2'){
				return {
					wordBank: wordBankHelper(state.randomNum, langTwoArr, langTwoArrInit)
				}
			} else {
				return {
					wordBank: wordBankHelper(state.randomNum, langOneArr, langOneArrInit)
				}
			}
		})
	}
	
	keyboardModehandleChange(event) {
		this.setState({translationInputValue: event.target.value})
	}
	
	handleSubmit(event) {
		event.preventDefault();
		var inputValueRegex = this.state.translationInputValue.toLowerCase().trim();
		var correctAnswerRegex = this.state.langTo[this.state.randomNum].toLowerCase().trim()
		if(this.state.checkAccents === false) {
			inputValueRegex = inputValueRegex.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			correctAnswerRegex = correctAnswerRegex.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		}
		if (this.state.success === 'yes' || $('.success, .incorrect')[0]) {
			this.getCard();
		}
		else if (inputValueRegex === correctAnswerRegex) {
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
			}, () => {
				// this.getCard();
			})
		} else {
			this.setState({
				translateMode: '1to2'
			}, () => {
				// this.getCard();
			})
		}
	}

	showAnswerFc() {
		$('#root').toggleClass('show-answer');
	}

	setList(value) {
		if (value === 'es-basics') {
			let spreadsheetID = "1DNL5d4bJXOdAMnWtQesxksF4aTDFjtAV5xnFVfVbc5w";
			this.getData(spreadsheetID);
			this.getCard();
			alert('List Changed to Spanish Basics')
		} else if (value === 'it-basics') {
			let spreadsheetID  = "1DntQwj2nfvobtxkOExsSMm2DLHQNlzf2q48WhWlMqAM";
			this.getData(spreadsheetID);
			alert('List Changed to Italian Basics')
		} else if (value === 'it-other') {
			let spreadsheetID  = "16PNgsOyvfz6BIpjCqHMtMWBg59qLhyj5TVvmXzSzmPA";
			this.getData(spreadsheetID);
			alert('List Changed to Italian Other')
		} else if (value === 'test') {
			let spreadsheetID  = "1_qux2HIN3GhyYmaDF2KCg1JAAoe8c6xhPV228mR5hq8";
			this.getData(spreadsheetID);
			alert('List Changed to Test List')
		} else {
			let spreadsheetID = value;
			this.getData(spreadsheetID);
			$('#close-custom-list-modal').click();
			alert('List Changed to custom list')

		}
	}

	customListhandleChange(event) {
		this.setState({customListInputValue: event.target.value})
	}
	
	render() {
    	return (
			<div className={"container main-container " + this.state.inputMode}>
				<Nav 
					setList={this.setList}
					switchInput={this.switchInput}
				/>
				<ProgressBar 
					langOneArrLength={langOneArr.length}
					progressWidth={progressWidth}
					initialCount={this.state.initialCount}
				/>
				<form  onSubmit={this.handleSubmit}  id="form">
					<h3 onClick={this.switchTranslationMode}>Translate to <span>{this.state.translateMode === "1to2" ? this.state.language1 : this.state.language2}</span>:</h3>
					<h1 className="lang-from" onClick={this.state.inputMode === 'Flashcard' ? this.showAnswerFc : ''}>"{this.state.langFrom[this.state.randomNum]}"</h1>
					{this.state.inputMode === 'Flashcard' && [
						<h1 className="lang-to" onClick={this.showAnswerFc}>"{this.state.langTo[this.state.randomNum]}"</h1>,
						<i className="material-icons swap-card" onClick={this.showAnswerFc}>swap_vertical_circle</i>,
						<span className="navigate-next" onClick={this.getCard}><i className="material-icons">navigate_next</i></span>,
						<span className="archive" onClick={this.archiveCard}><i className="material-icons">archive</i></span>
					]}
					{<input type="text" placeholder="Enter translation" value={this.state.translationInputValue} onChange={this.keyboardModehandleChange} className="form-control" />}
					<div className="list-group word-bank">
						{
						this.state.wordBank.map((word) =>
						<button type="button" className="list-group-item" value={word}  onClick={this.keyboardModehandleChange}>{word} <a className="google-translate" href={"https://translate.google.com/#view=home&textMi%20chaimo%20Tim&text=" + word + "&op=translate&sl=it&tl=en"} target="_blank"><i className="material-icons">
						g_translate</i></a></button>
						)}
					</div>
				</form>
				<ButtonsContainer 
					handleSubmit={this.handleSubmit}
					translateMode={this.state.translateMode}
					getCard={this.getCard}
					randomNum={this.state.randomNum}
					langOneArr={langOneArr}
					langTwoArr={langTwoArr}
				/>
				<Modals 
					customListInputValue={this.state.customListInputValue}
					customListhandleChange={this.customListhandleChange}
					setList={this.setList}
					getData={this.getData}
				/>
			</div>
		)
	}
}

export default TranslationApp;