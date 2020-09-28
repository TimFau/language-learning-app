import React from 'react';

const nav = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select List</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <span className="dropdown-item"  onClick={(value) => props.setList('it-basics')}>Italian Basics</span>
                            <span className="dropdown-item" onClick={(value) => props.setList('it-other')}>Italian Other</span>
                            <span className="dropdown-item" onClick={(value) => props.setList('es-basics')}>Spanish</span>
                            <span className="dropdown-item" onClick={(value) => props.setList('test')}>Test List</span>
                            <button type="button" className="dropdown-item" data-toggle="modal" data-target="#custom-list-modal">Load Custom</button>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Input Mode</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <span className="dropdown-item" onClick={(Keyboard) => props.switchInput('Flashcard')}>Flashcard</span>
                            <span className="dropdown-item" onClick={(Keyboard) => props.switchInput('Keyboard')}>Keyboard</span>
                            <span className="dropdown-item" onClick={(Keyboard) => props.switchInput('Wordbank')}>Wordbank</span>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Translation Mode</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {props.translateMode === "1to2" ? 
                            <span className="dropdown-item" onClick={props.switchTranslationMode}>{props.language1} to {props.language2}</span>
                            :
                            <span className="dropdown-item" onClick={props.switchTranslationMode}>{props.language2} to {props.language1}</span>
                            }
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    )
}

export default nav;