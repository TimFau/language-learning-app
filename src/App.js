import React from 'react';
import './css/main.scss';
import {wordBankHelper} from './Functions';
import Nav from './components/Nav';
import ProgressBar from './components/ProgressBar';
import BottomButtonsContainer from './components/BottomButtonsContainer';
import Form from './components/Form';
import DeckSelector from './components/DeckSelector';
import Cookies from 'universal-cookie';

// global vars
var langOneArr = [];
var langTwoArr = [];
var progressWidth = {};
var langOneArrInit = [];
var langTwoArrInit = [];
const cookies = new Cookies();

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
			deckLoadingMsg: '',
			// set default state values
			translateMode: '1to2',
			inputMode: 'Flashcard',
			checkAccents: false,
			showAnswer: false,
			deckStarted: false,
			success: false,
			incorrect: false,
			deckLoadingError: false,
			deckDialogOpen: false,
			introOpen: false
		};
		// bindings
		this.getCard = this.getCard.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.keyboardModeHandleChange = this.keyboardModeHandleChange.bind(this);
		this.switchInput = this.switchInput.bind(this);
		this.showAnswerFc = this.showAnswerFc.bind(this);
		this.archiveCard = this.archiveCard.bind(this);
		this.getData = this.getData.bind(this);
		this.goToDeckSelector = this.goToDeckSelector.bind(this);
		this.setTranslationMode1 = this.setTranslationMode1.bind(this);
		this.setTranslationMode2 = this.setTranslationMode2.bind(this);
		this.setDeckDialogOpen = this.setDeckDialogOpen.bind(this);
		this.introHandler = this.introHandler.bind(this);
	}
	  
	getData(value) {
		let request = "https://spreadsheets.google.com/feeds/list/" + value + "/od6/public/values?alt=json";
		fetch(request, {mode: 'cors'})
			.then( response => {
				return response.json();
			})
			.then( data => {
				// console.log(data.feed.entry)
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
					success: false,
					incorrect: false,
					deckLoadingError: false,
					deckLoadingMsg: ''
				}))
				langOneArrInit = langOneArr.slice();
				langTwoArrInit = langTwoArr.slice();
				this.handleWordBank();
				this.getCard();
				this.setDeckDialogOpen(true);
			})
			.catch((error) => {
				console.error('Error', error)
				this.setState({
					deckLoadingError: true,
					deckLoadingMsg: 'There was an issue loading the deck. Please check the Spreadsheet ID and share settings.'
				})
				this.setDeckDialogOpen(false);
			})
	}
	
	getCard() {
		if (this.state.success) {
			langOneArr.splice(this.state.randomNum, 1);
			langTwoArr.splice(this.state.randomNum, 1);
		}
		this.setState((state, props) =>  ({
			randomNum: Math.floor(Math.random() * langOneArr.length),
			randomNum2: Math.floor(Math.random() * langOneArrInit.length),
			success: false,
			incorrect: false,
			translationInputValue: '',
			langFrom: this.state.translateMode === '1to2' ? langOneArr : langTwoArr,
			langTo: this.state.translateMode === '1to2' ? langTwoArr : langOneArr,
			showAnswer: false
		}));
		this.handleWordBank();
		progressWidth = {
			width: (this.state.initialCount - langOneArr.length) * (100 / this.state.initialCount) + '%'
		}
	}

	archiveCard() {
		langOneArr.splice(this.state.randomNum, 1);
		langTwoArr.splice(this.state.randomNum, 1);
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
	
	handleSubmit(event) {
		event.preventDefault();
		var inputValueRegex = this.state.translationInputValue.toLowerCase().trim().replace(/\./g,'');
		var correctAnswerRegex = this.state.langTo[this.state.randomNum].toLowerCase().trim().replace(/\./g,'');
		if(this.state.checkAccents === false) {
			inputValueRegex = inputValueRegex.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			correctAnswerRegex = correctAnswerRegex.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		}
		if (inputValueRegex === correctAnswerRegex) {
			this.setState({success: true})
		}  else {
			this.setState({incorrect: true})
		}
		this.setState({showAnswer: true});
	}

	// State Handlers
	keyboardModeHandleChange(e) {
		this.setState({translationInputValue: e.currentTarget.value})
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
	setTranslationMode1() {
		this.setState({
			translateMode: '1to2'
		})
	}
	setTranslationMode2() {
		this.setState({
			translateMode: '2to1'
		})
	}
	showAnswerFc() {
		this.setState({showAnswer: true})
	}
	goToDeckSelector() {
		this.setState({
			deckStarted: false
		})
		this.setDeckDialogOpen(false);
	}
	startDeck = () => {
		this.setState({
			deckStarted: true
		})
	}
	setDeckDialogOpen(boolean) {
		this.setState({
			deckDialogOpen: boolean
		})
	}
	introHandler(boolean) {
        this.setState({
			introOpen: boolean
		})
		if (boolean === false) {
			let date = new Date();
			date.setTime(date.getTime()+(30*24*60*60*1000));
			cookies.set('prevViewed', '1', { path: '/', expires: date });
		}
	}
	
	//Lifecycle hooks
	componentDidMount() {
		if (!cookies.get('prevViewed')) {
			this.introHandler(true);
		}
	}
	
	render() {
    	return (
			<div className={"container main-container " + this.state.inputMode}>
				<Nav
					goToDeckSelector={this.goToDeckSelector}
					deckStarted={this.state.deckStarted}
					introHandler={this.introHandler}
				/>
				{this.state.deckStarted ?
				<Form
					handleSubmit={this.handleSubmit}
					inputMode={this.state.inputMode}
					showAnswerFc={this.showAnswerFc}
					showAnswer={this.state.showAnswer}
					getCard={this.getCard}
					archiveCard={this.archiveCard}
					langTo={this.state.langTo}
					langFrom={this.state.langFrom}
					randomNum={this.state.randomNum}
					translateMode={this.state.translateMode}
					language1={this.state.language1}
					language2={this.state.language2}
					translationInputValue={this.state.translationInputValue}
					keyboardModeHandleChange={this.keyboardModeHandleChange}
					wordBank={this.state.wordBank}
					goToDeckSelector={this.goToDeckSelector}
					langOneArrLength={langOneArr.length}
				>
					<ProgressBar 
					langOneArrLength={langOneArr.length}
					progressWidth={progressWidth}
					initialCount={this.state.initialCount}
					/>
				</Form>
				: 
				<DeckSelector 
					language1={this.state.language1}
					language2={this.state.language2}
					getData={this.getData}
					translateMode={this.state.translateMode}
					setTranslationMode1={this.setTranslationMode1}
					setTranslationMode2={this.setTranslationMode2}
					switchInput={this.switchInput}
					startDeck={this.startDeck}
					deckLoadingError={this.state.deckLoadingError}
					deckLoadingMsg={this.state.deckLoadingMsg}
					setDeckDialogOpen={this.setDeckDialogOpen}
					deckDialogOpen={this.state.deckDialogOpen}
					introOpen={this.state.introOpen}
					introHandler={this.introHandler}
				>
					
				</DeckSelector>
				}
				{this.state.inputMode !== 'Flashcard' && this.state.deckStarted ?
					<BottomButtonsContainer 
						handleSubmit={this.handleSubmit}
						translateMode={this.state.translateMode}
						getCard={this.getCard}
						randomNum={this.state.randomNum}
						langOneArr={langOneArr}
						langTwoArr={langTwoArr}
						success={this.state.success}
						incorrect={this.state.incorrect}
						showAnswer={this.state.showAnswer}
					/>
				: null }
			</div>
		)
	}
}

export default TranslationApp;