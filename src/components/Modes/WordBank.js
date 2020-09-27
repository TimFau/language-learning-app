import React from 'react';

const flashCard = (props) => {
    return(
        <div className="list-group word-bank">
            <h1 className="lang-from">"{props.langFrom[props.randomNum]}"</h1>
            <h1 className="lang-to">"{props.langTo[props.randomNum]}"</h1>
            { props.wordBank.map((word) =>
            <button type="button" className="list-group-item" value={word}  onClick={props.keyboardModehandleChange}>{word} <a className="google-translate" href={"https://translate.google.com/#view=home&textMi%20chaimo%20Tim&text=" + word + "&op=translate&sl=it&tl=en"} target="_blank"><i className="material-icons">
            g_translate</i></a></button>
            ) }
        </div>
    )
}

export default flashCard;


