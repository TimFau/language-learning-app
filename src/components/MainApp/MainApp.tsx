import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { wordBankHelper } from '../../scripts/Helpers';
import ProgressBar from '../ProgressBar';
import BottomButtonsContainer from './BottomButtonsContainer';

import Nav from '../Nav';
import Deck from '../Pages/Deck';
import GuestPage from '../Pages/Guest'
import Account from '../Pages/LoggedIn';
import DemoDeck from './DeckSelector/DemoDecksDrawer';
import DeckDialog from '../Modals/DeckDialog';
import Login from '../Modals/Login';
import Cookies from 'universal-cookie';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material/';

// global vars
var langOneArr: string[];
var langTwoArr: string[];
var progressWidth = {};
var langOneArrInit: string[];
var langTwoArrInit: string[];
const cookies = new Cookies();

interface RootState {
    language1: string | undefined,
    language2: string | undefined,
    langFrom: Array<any>,
    langTo: Array<any>,
    translationInputValue: string,
    wordBank: Array<any>,
    deckLoadingMsg: string,
    // set default state values
    translateMode: string,
    inputMode: string,
    checkAccents: boolean,
    showAnswer: boolean,
    success: boolean,
    incorrect: boolean,
    deckLoadingError: boolean,
    currentListId: string,
    currentListName: string,
    deckDataLoaded: boolean,
    logOutDialogOpen: boolean,
    randomNum: number,
    randomNum2: number,
    initialCount: number,
}

class TranslationApp extends React.Component<PropsFromRedux, RootState> {
    constructor(props: PropsFromRedux) {
        super(props);
        // state initialization
        this.state = {
            language1: '',
            language2: '',
            langFrom: [],
            langTo: [],
            translationInputValue: '',
            wordBank: [],
            deckLoadingMsg: '',
            // set default state values
            translateMode: '1to2',
            inputMode: 'Flashcard',
            checkAccents: false,
            showAnswer: false,
            success: false,
            incorrect: false,
            deckLoadingError: false,
            currentListId: '',
            currentListName: '',
            deckDataLoaded: false,
            logOutDialogOpen: false,
            randomNum: 0,
            randomNum2: 0,
            initialCount: 0
        };
        // bindings
        this.getCard = this.getCard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.keyboardModeHandleChange = this.keyboardModeHandleChange.bind(this);
        this.switchInput = this.switchInput.bind(this);
        this.showAnswerFc = this.showAnswerFc.bind(this);
        this.archiveCard = this.archiveCard.bind(this);
        this.getDeckData = this.getDeckData.bind(this);
        this.goToDeckSelector = this.goToDeckSelector.bind(this);
        this.setTranslationMode1 = this.setTranslationMode1.bind(this);
        this.setTranslationMode2 = this.setTranslationMode2.bind(this);
        this.setLogOutDialogOpen = this.setLogOutDialogOpen.bind(this);
        this.setLogOutDialogClose = this.setLogOutDialogClose.bind(this);
        this.logout = this.logout.bind(this);
    }
  
    
    getDeckData(value: string) {
        let request = "https://opensheet.vercel.app/" + value + "/Sheet1";
        fetch(request, {mode: 'cors'})
            .then( response => {
                return response.json();
            })
            .then( data => {
                langOneArr = [];
                langTwoArr = [];
                progressWidth = {};
                if (data.length > 0) {
                    data.forEach(function(item: any){
                        langOneArr.push(item.Language1);
                        langTwoArr.push(item.Language2);
                    })
                } else if (data.error) {
                    console.log('Deck Load Error: ' + data.error)
                } else {
                    console.log('Data is empty; Deck not loaded')
                }
                this.setState({
                    language1: langOneArr.shift(),
                    language2: langTwoArr.shift(),
                    initialCount: langOneArr.length,
                    randomNum: Math.floor(Math.random() * langOneArr.length),
                    randomNum2: (Math.floor(Math.random() * langOneArr.length) - 4),
                    success: false,
                    incorrect: false,
                    deckLoadingError: false,
                    deckLoadingMsg: '',
                    deckDataLoaded: true
                })
                langOneArrInit = langOneArr.slice();
                langTwoArrInit = langTwoArr.slice();
                this.props.setDeckDialogOpen();
            })
            .catch((error) => {
                console.error('Error', error)
                this.setState({
                    deckLoadingError: true,
                    deckLoadingMsg: 'There was an issue loading the deck. Please check the Spreadsheet ID and share settings.'
                })
                this.props.setDeckDialogClose();
            })
    }

    getCard() {
        if (this.state.success) {
            langOneArr.splice(this.state.randomNum, 1);
            langTwoArr.splice(this.state.randomNum, 1);
        }
        this.setState({
            randomNum: Math.floor(Math.random() * langOneArr.length),
            randomNum2: Math.floor(Math.random() * langOneArrInit.length),
            success: false,
            incorrect: false,
            translationInputValue: '',
            langFrom: this.state.translateMode === '1to2' ? langOneArr : langTwoArr,
            langTo: this.state.translateMode === '1to2' ? langTwoArr : langOneArr,
            showAnswer: false
        });
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

    handleSubmit(event: React.FormEvent<HTMLInputElement>) {
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
    keyboardModeHandleChange(event: React.ChangeEvent<HTMLInputElement> ) {
        this.setState({translationInputValue: event.currentTarget.value})
    }
    switchInput(value: string) {
        if(value === 'Wordbank'){
            this.setState({
                inputMode: 'Wordbank'
            })
            this.handleWordBank();
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
            translateMode: '1to2',
            langFrom: langOneArr,
            langTo:  langTwoArr 
        })
    }
    setTranslationMode2() {
        this.setState({
            translateMode: '2to1',
            langFrom: langTwoArr,
            langTo: langOneArr
        })
    }
    showAnswerFc() {
        this.setState({showAnswer: true})
    }
    goToDeckSelector() {
        this.props.setDeckStartedFalse();
        this.props.setDeckDialogClose();
    }
    deckOptions(listName: string, listId: string) {
        this.setState({deckDataLoaded: false})
        this.getDeckData(listId)
        this.setState({
            currentListName: listName,
            currentListId: listId
        });
        this.props.setDemoDrawerClosed();
        this.props.setDeckDialogOpen();
    }
    startDeck() {
        this.getCard();
        this.switchInput(this.state.inputMode)
        this.props.setDeckStartedTrue();
        this.props.setDeckDialogClose();
    }
    setInputMode(value: string) {
        this.setState({inputMode: value})
    }
    setLogOutDialogOpen() {
        this.setState({logOutDialogOpen: true})
    }
    setLogOutDialogClose() {
        this.setState({logOutDialogOpen: false})
    }
    logout(endDeck = false) {
        if (this.props.deckStarted && !endDeck) {
            this.setLogOutDialogOpen()
        } else {
            this.props.setDeckStartedFalse();
            cookies.remove('token', { path: '/' });
            this.props.setUserToken();
            this.setLogOutDialogClose();
        }
    };

    //Lifecycle hooks
    componentDidMount() {
        if (!cookies.get('prevViewed')) {
            this.props.openIntro();
        }
    }
  
  render() {
      return (
          <BrowserRouter>
            <Nav logout={() => this.logout(false)} />
            <div className={"container main-container " + this.state.inputMode}>
                {this.props.deckStarted ?
                    <Deck
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
                  </Deck>
                : null }
                {((!this.props.deckStarted) && (this.props.userToken === undefined || this.props.userToken === '')) &&
                    <React.Fragment>
                        <GuestPage />
                        <DemoDeck 
                            deckOptions={this.deckOptions.bind(this)}
                            open={this.props.demoDrawerOpen}
                            onClose={this.props.setDemoDrawerClosed}
                        />
                    </React.Fragment>
                }
                {(!this.props.deckStarted && this.props.userToken) &&
                    <Account deckOptions={this.deckOptions.bind(this)} />
                }
                <DeckDialog
                    inputMode={this.state.inputMode}
                    currentListName={this.state.currentListName}
                    setInputMode={this.setInputMode.bind(this)}
                    setDialogClosed={this.props.setDeckDialogClose}
                    deckDialogOpen={this.props.deckDialogOpen}
                    setTranslationMode1={this.setTranslationMode1}
                    setTranslationMode2={this.setTranslationMode2}
                    translateMode={this.state.translateMode}
                    language1={this.state.language1}
                    language2={this.state.language2}
                    startDeck={this.startDeck.bind(this)}
                    deckDataLoaded={this.state.deckDataLoaded}
                >
                </DeckDialog>
                  {this.state.inputMode !== 'Flashcard' && this.props.deckStarted ?
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
            <Login />
            <Dialog
                open={this.state.logOutDialogOpen}
                onClose={this.setLogOutDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Logout and close deck?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Logging out now will close the current deck without saving your progress. Would you like to continue?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.setLogOutDialogClose}>No</Button>
                <Button onClick={() => this.logout(true)} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
          </BrowserRouter>
      )
  }
}

const mapStateToProps = (state: any) => ({
    deckStarted: state.deckStarted,
    deckDialogOpen: state.deckDialogOpen,
    demoDrawerOpen: state.demoDrawerOpen,
    userToken: state.token
})

const mapDispatchToProps = {
    openIntro: () => ({type: 'modals/setIntroOpen', value: true}),
    setDeckDialogOpen: () => ({type: 'deck/setDialog', value: true}),
    setDeckDialogClose: () => ({type: 'deck/setDialog', value: false}),
    setDeckStartedTrue: () => ({type: 'deck/setDeckStarted', value: true}),
    setDeckStartedFalse: () => ({type: 'deck/setDeckStarted', value: false}),
    setDemoDrawerOpen: () => ({type: 'deck/setDemoDrawer', value: true}),
    setDemoDrawerClosed: () => ({type: 'deck/setDemoDrawer', value: false}),
    setUserToken: () => ({type: 'user/setToken', value: ''})
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TranslationApp);