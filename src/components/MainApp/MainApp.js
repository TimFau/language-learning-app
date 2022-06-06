import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { wordBankHelper } from '../../Helpers';
import ProgressBar from '../../components/ProgressBar';
import BottomButtonsContainer from './BottomButtonsContainer';

import Nav from '../../components/Nav';
import Form from '../../components/Form';
// import DeckSelector from './DeckSelector/DeckSelector';
import GuestPage from '../GuestPage'
import Account from '../Account/Account';
import DemoDeck from './DeckSelector/DemoDecks';
import DeckDialog from '../Modals/DeckDialog';
import Login from '../Modals/Login';
import Cookies from 'universal-cookie';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material/';

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
          success: false,
          incorrect: false,
          deckLoadingError: false,
          currentListId: '',
          currentListName: '',
          deckDataLoaded: false,
          logOutDialogOpen: false
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
      this.endDeckAndLogout = this.endDeckAndLogout.bind(this);
  }
  
    
  getDeckData(value) {
      let request = "https://opensheet.vercel.app/" + value + "/Sheet1";
      fetch(request, {mode: 'cors'})
          .then( response => {
              return response.json();
          })
          .then( data => {
              langOneArr = [];
              langTwoArr = [];
              progressWidth = {};
              data.forEach(function(item){
                  langOneArr.push(item.Language1);
                  langTwoArr.push(item.Language2);
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
                  deckLoadingMsg: '',
                  deckDataLoaded: true
              }))
              langOneArrInit = langOneArr.slice();
              langTwoArrInit = langTwoArr.slice();
            //   this.getCard();
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
    deckOptions(listName, listId) {
        this.setState({deckDataLoaded: false})
        this.getDeckData(listId)
        this.setState({
            currentListName: listName,
            currentListId: listId
        });
        this.props.setDemoDrawerClosed();
        this.props.setDeckDialogOpen();
    }
    startDeck(listId) {
        this.getCard();
        this.switchInput(this.state.inputMode)
        this.props.setDeckStartedTrue();
        this.props.setDeckDialogClose();
    }
    setInputMode(value) {
        this.setState({inputMode: value})
    }
    setLogOutDialogOpen() {
        this.setState({logOutDialogOpen: true})
    }
    setLogOutDialogClose() {
        this.setState({logOutDialogOpen: false})
    }
    logout(props, endDeck = false) {
        if (this.props.deckStarted && !endDeck) {
            this.setLogOutDialogOpen()
        } else {
            this.props.setDeckStartedFalse();
            cookies.remove('token', { path: '/' });
            this.props.setUserToken()
        }
	};
    endDeckAndLogout() {
        this.logout(this, true);
        this.setLogOutDialogClose();
    }
  
    //Lifecycle hooks
    componentDidMount() {
        if (!cookies.get('prevViewed')) {
            this.props.openIntro();
        }
    }
  
  render() {
      return (
          <BrowserRouter>
            <Nav logout={this.logout} />
            <div className={"container main-container " + this.state.inputMode}>
                {this.props.deckStarted ?
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
                : null }
                {(!this.props.deckStarted && this.props.userToken === undefined) &&
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
                <Button onClick={this.endDeckAndLogout} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
          </BrowserRouter>
      )
  }
}

const mapStateToProps = state => {
    return {
        deckStarted: state.deckStarted,
        deckDialogOpen: state.deckDialogOpen,
        demoDrawerOpen: state.demoDrawerOpen,
        userToken: state.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        openIntro: () => dispatch({type: 'modals/setIntroOpen', value: true}),
        setDeckDialogOpen: () => dispatch({type: 'deck/setDialog', value: true}),
        setDeckDialogClose: () => dispatch({type: 'deck/setDialog', value: false}),
        setDeckStartedTrue: () => dispatch({type: 'deck/setDeckStarted', value: true}),
        setDeckStartedFalse: () => dispatch({type: 'deck/setDeckStarted', value: false}),
        setDemoDrawerOpen: () => dispatch({type: 'deck/setDemoDrawer', value: true}),
        setDemoDrawerClosed: () => dispatch({type: 'deck/setDemoDrawer', value: false}),
        setUserToken: () => dispatch({type: 'user/setToken', value: undefined})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslationApp);