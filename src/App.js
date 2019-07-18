import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
import './App.scss';

const spreadsheetID  = "1DNL5d4bJXOdAMnWtQesxksF4aTDFjtAV5xnFVfVbc5w";

class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			language1: '',
			language2: '',
      word: '',
			translation: '',
			inputValue: '',
			langOneArr: [],
			langTwoArr: []
    };
		this.getCard = this.getCard.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
  }
	
	getCard() {
		$('#root').removeClass('success');
		$('#root').removeClass('incorrect');
		var langOneArr = [];
		var langTwoArr = [];
		$.get("https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json", function(json) {
			var jsonData = json.feed.entry;
			$(jsonData).each(function(){
				langOneArr.push(this.gsx$language1.$t);
				langTwoArr.push(this.gsx$langauge2.$t);
			})
			var num = Math.floor(Math.random() * langOneArr.length) + 2;
			this.setState({
				language1: langOneArr[0],
				language2: langTwoArr[0],
				word: langOneArr[num],
				translation: langTwoArr[num],
				wordsLeft: langOneArr.length
			})
		}.bind(this));
	}
	
	componentDidMount() {
    this.getCard();
  }
	
	handleChange(event) {
		this.setState({inputValue: event.target.value})
	}
	
	handleSubmit(event) {
		event.preventDefault();
		var value = this.state.inputValue;
		if (value.toLowerCase() === this.state.translation.toLowerCase()) {
				$('#root').addClass('success');
		} else {
			$('#root').addClass('incorrect');
		}
		this.setState({inputValue: ''})
	}
	
	
	render() {
    return (
			<div className="container">
				<span>{this.state.wordsLeft} words left to practice</span><br/>
				<form onSubmit={this.handleSubmit}>
					<h1>Write "{this.state.word}" in {this.state.language2}</h1>
					<input type="text" placeholder="Enter translation" value={this.state.inputValue} onChange={this.handleChange} className="form-control"></input>
					<div className="button-container">
						<button type="button" onClick={this.getCard} className="btn btn-lg btn-left">Skip</button>
						<button type="submit" value="submit" className="btn btn-primary btn-lg btn-right">Submit</button>
						<div className="alert alert-success container-fluid">
							<div className="message">
								<h4>Correct:</h4>
								<span>{this.state.translation}</span>
							</div>
							<button type="button" onClick={this.getCard} className="btn btn-success">Continue</button>
						</div>
						<div className="alert alert-danger container-fluid">
							<div className="message">
								<h4>Correct answer:</h4>
								<span>{this.state.translation}</span>
							</div>
							<button type="button" onClick={this.getCard} className="btn btn-danger">Continue</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}


export default FlashCard;
