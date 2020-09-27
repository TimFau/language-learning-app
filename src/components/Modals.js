import React from 'react';

const modals = (props) => {
    return (
        <div className="modals">
            {/* Set Custom List Modal */}
            <div className="modal" id="custom-list-modal" tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Load Custom List</h5>
                        <button type="button" className="close" id="close-custom-list-modal" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Enter list ID from Google Sheets Document.</p>
                        <input value={props.customListInputValue} onChange={props.customListhandleChange} placeholder="ID Here"></input>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={(value) => props.setList(props.customListInputValue)}>Load</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Success Modal */}
            <div className="modal" id="success-modal" tabindex="-1" role="dialog">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Congralutations!</h5>
                    </div>
                    <div className="modal-body">
                        <h3>You've finished the list!</h3>
                        <button className="btn btn-secondary"  onClick={(value) => props.getData(props.currentList)}>Repeat List</button>
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select New</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <span className="dropdown-item"  onClick={(value) => props.setList('it-basics')}>Italian Basics</span>
                                <span className="dropdown-item" onClick={(value) => props.setList('it-other')}>Italian Other</span>
                                <span className="dropdown-item" onClick={(value) => props.setList('es-basics')}>Spanish</span>
                                <span className="dropdown-item" onClick={(value) => props.setList('test')}>Test List</span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default modals;