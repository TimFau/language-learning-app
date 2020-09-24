import React from 'react';

export default function Nav({setList, switchInput}) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/* <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li> */}
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select List</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <span className="dropdown-item"  onClick={(value) => setList('it-basics')}>Italian Basics</span>
                            <span className="dropdown-item" onClick={(value) => setList('it-other')}>Italian Other</span>
                            <span className="dropdown-item" onClick={(value) => setList('es-basics')}>Spanish</span>
                            <span className="dropdown-item" onClick={(value) => setList('test')}>Test List</span>
                            <button type="button" className="dropdown-item" data-toggle="modal" data-target="#custom-list-modal">Load Custom</button>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Input Mode</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <span className="dropdown-item" onClick={(Keyboard) => switchInput('Flashcard')}>Flashcard</span>
                            <span className="dropdown-item" onClick={(Keyboard) => switchInput('Keyboard')}>Keyboard</span>
                            <span className="dropdown-item" onClick={(Keyboard) => switchInput('Wordbank')}>Wordbank</span>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    )
}