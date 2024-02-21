import React from 'react';
import "./modelpopup.css";

function ModalPopUp({id, Header, submit, body, onClose }) {
  return (
    <div className="modal">
        <div id={id || "Modal"} className="modal-content">
                <div className="modal-header">
                <h4>{Header ? Header : "Header"}</h4>
                <span onClick={onClose} className="close-modal-icon">&times;</span>
                </div>
                <div className="modal-body">
                        {body ? (
                            body
                        ) : 
                        <div>
                            <p>This is our model body</p>
                        </div>
                        }
                </div>
                <div className='modal-footer'>
                        This is footer
                </div>
        </div>
    </div>
  )
}

export default ModalPopUp;