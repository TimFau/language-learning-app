import React from 'react';

const form = ({props, handleSubmit}) => {
    return (
        <form  onSubmit={handleSubmit}  id="form">
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
    )
}

export default form;