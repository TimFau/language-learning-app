import React from 'react';
import './css/main.scss';
import {wordBankHelper} from './Functions';
import Nav from './components/Nav';
import ProgressBar from './components/ProgressBar';
import ButtonsContainer from './components/ButtonsContainer';
import Form from './components/Form';
import DeckSelector from './components/DeckSelector';

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
			currentList: '',
			// set default state values
			translateMode: '1to2',
			inputMode: 'Flashcard',
			checkAccents: false,
			dataLoaded: false,
			showAnswer: false,
			deckStarted: false,
			success: false,
			incorrect: false
		};
		// bindings
		this.getCard = this.getCard.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.keyboardModeHandleChange = this.keyboardModeHandleChange.bind(this);
		this.switchInput = this.switchInput.bind(this);
		this.switchTranslationMode = this.switchTranslationMode.bind(this);
		this.showAnswerFc = this.showAnswerFc.bind(this);
		this.archiveCard = this.archiveCard.bind(this);
		this.setList = this.setList.bind(this);
		this.goToDeckSelector = this.goToDeckSelector.bind(this);
		this.setTranslationMode1 = this.setTranslationMode1.bind(this);
		this.setTranslationMode2 = this.setTranslationMode2.bind(this);
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
					success: false,
					incorrect: false,
					currentList: value
				}))
				langOneArrInit = langOneArr.slice();
				langTwoArrInit = langTwoArr.slice();
				this.handleWordBank();
				this.getCard();
				this.setState({ dataLoaded: true })
			})//.bind(this);
	}

	componentWillMount() {
		this.getData();
	}
	
	componentDidMount() {
		document.addEventListener("keydown", event => {
			// show card on space, up, or down
			if (event.isComposing || event.keyCode === 40 || event.keyCode === 38) {
				this.setState({showAnswer: true})
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
		console.log('getCard');
		document.querySelectorAll('.modal').forEach(modal => {modal.style.display = "none"})
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
		// if(langOneArr.length === 0){
		// 	document.getElementById('success-modal').style.display = "block";
		// }
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
	
	keyboardModeHandleChange(e) {
		console.log('keyboardModeHandleChange');
		console.log(e.currentTarget.value);
		this.setState({translationInputValue: e.currentTarget.value})
	}
	
	handleSubmit(event) {
		event.preventDefault();
		var inputValueRegex = this.state.translationInputValue.toLowerCase().trim().replace(/\./g,'');
		var correctAnswerRegex = this.state.langTo[this.state.randomNum].toLowerCase().trim().replace(/\./g,'');
		if(this.state.checkAccents === false) {
			inputValueRegex = inputValueRegex.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			correctAnswerRegex = correctAnswerRegex.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		}
		console.log(inputValueRegex, correctAnswerRegex);
		console.log(inputValueRegex === correctAnswerRegex);
		if (inputValueRegex === correctAnswerRegex) {
			this.setState({success: true})
			console.log('if', this.state.success)
		}  else {
			this.setState({incorrect: true})
			console.log('else', this.state.success)
		}
		this.setState({showAnswer: true});
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
		console.log('showAnswerFc');
		this.setState({showAnswer: true})
	}

	goToDeckSelector() {
		this.setState({
			deckStarted: false
		})
	}

	setList = (listId) => {
		console.log('setList')
		console.log(listId)
		let spreadsheetID = listId;
		this.getData(spreadsheetID);
		this.setState({
			deckStarted: true
		})
		console.log(listId)
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
					goToDeckSelector={this.goToDeckSelector}
				/>
				{this.state.deckStarted ?
				<Form
					dataLoaded={this.state.dataLoaded}
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
					setList={this.setList}
					translateMode={this.state.translateMode}
					setTranslationMode1={this.setTranslationMode1}
					setTranslationMode2={this.setTranslationMode2}
					switchInput={this.switchInput}
				>
					
				</DeckSelector>
				}
				{this.state.inputMode !== 'Flashcard' && this.state.deckStarted ?
					<ButtonsContainer 
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