import React from 'react';
import 'bootstrap/dist/js/bootstrap.js';
import './css/custom.scss';
import './css/main.scss';
import {wordBankHelper} from './Functions';
import Nav from './components/Nav';
import ProgressBar from './components/ProgressBar';
import Modals from './components/Modals';
import ButtonsContainer from './components/ButtonsContainer';
import FlashCard from './components/Modes/FlashCard';
import WordBank from './components/Modes/WordBank';
import Keyboard from './components/Modes/Keyboard';

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
		let request = "https://spreadsheets.google.com/feeds/list/" + value + "/od6/public/values?alt=json";
		fetch(request, {mode: 'cors'})
			.then( response => {
				return response.json();
			})
			.then( data => {
				console.log(data.feed.entry)
				langOneArr = [];
				langTwoArr = [];
				progressWidth = {};
				data.feed.entry.forEach(function(item){
					langOneArr.push(item.gsx$language1.$t);
					langTwoArr.push(item.gsx$langauge2.$t);
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
			})//.bind(this);
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
		console.log(this.props)
	}
	
	getCard() {
		document.getElementById('root').classList.remove('success','incorrect','show-answer');
		document.querySelectorAll('.modal').forEach(modal => {modal.style.display = "none"})
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
			document.getElementById('success-modal').style.display = "block";
		}
	}

	archiveCard() {
		langOneArr.splice(this.state.randomNum, 1) ;
		langTwoArr.splice(this.state.randomNum, 1);
		document.getElementById('root').classList.remove('show-answer');
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
		if (this.state.success === 'yes') {
			this.getCard();
		}
		else if (inputValueRegex === correctAnswerRegex) {
			document.getElementById('root').classList.add('success');
			this.setState({success: 'yes'})
		}  else {
			document.getElementById('root').classList.add('incorrect');
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
				this.getCard();
			})
		} else {
			this.setState({
				translateMode: '1to2'
			}, () => {
				this.getCard();
			})
		}
	}

	showAnswerFc() {
		document.getElementById('root').classList.toggle('show-answer');
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
			document.getElementById('close-custom-list-modal').click();
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
					switchTranslationMode={this.switchTranslationMode}
					language1={this.state.language1}
					language2={this.state.language2}
					translateMode={this.state.translateMode}
				/>
				<ProgressBar 
					langOneArrLength={langOneArr.length}
					progressWidth={progressWidth}
					initialCount={this.state.initialCount}
				/>
				<form onSubmit={this.handleSubmit}  id="form">
					<h3>Translate to <span>{this.state.translateMode === "1to2" ? this.state.language1 : this.state.language2}</span>:</h3>
					{this.state.inputMode === 'Flashcard' ?
						<FlashCard 
						showAnswerFc={this.showAnswerFc}
						getCard={this.getCard}
						archiveCard={this.archiveCard}
						langTo={this.state.langTo}
						langFrom={this.state.langFrom}
						randomNum={this.state.randomNum}
						/>
					: null }
					{this.state.inputMode === 'Keyboard' ?
						<Keyboard 
						langTo={this.state.langTo}
						langFrom={this.state.langFrom}
						randomNum={this.state.randomNum}
						translationInputValue={this.state.translationInputValue}
						keyboardModehandleChange={this.keyboardModehandleChange}
						/>
					: null }
					{this.state.inputMode === 'Wordbank' ?
						<WordBank 
							langTo={this.state.langTo}
							langFrom={this.state.langFrom}
							randomNum={this.state.randomNum}
							wordBank={this.state.wordBank}
							keyboardModehandleChange={this.keyboardModehandleChange}
						/>
					: null }
				</form>
				{this.state.inputMode !== 'Flashcard' ?
					<ButtonsContainer 
						handleSubmit={this.handleSubmit}
						translateMode={this.state.translateMode}
						getCard={this.getCard}
						randomNum={this.state.randomNum}
						langOneArr={langOneArr}
						langTwoArr={langTwoArr}
					/>
				: null }
				<Modals 
					customListInputValue={this.state.customListInputValue}
					customListhandleChange={this.customListhandleChange}
					setList={this.setList}
					getData={this.getData.bind(this)}
					currentList={this.state.currentList}
				/>
			</div>
		)
	}
}

export default TranslationApp;