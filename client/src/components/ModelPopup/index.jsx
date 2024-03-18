import React from 'react';
import "./modelpopup.css";
import BasicDateTimePicker from "../DateTimePicker"
import Dropzone from "../Dropzone";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import {useBookMutation} from "../../redux/slices/userSlice";
import {convertToUTC} from "../../utils/validations";
import { toast } from 'react-toastify';
import Spinner from '../Loading spinner/Spinner';
// import ModalComps from "../DoctorsCards/testComps";


function ModalPopUp({id, Header, BodyComponent, onClose, bodyStyle}) {

  return (
    <div style={{height:"750px"}}  className="modal">
        <div id={id || "Modal"} className="modal-content">
                <div className="modal-header">
                <h4>{Header ? Header : "Header"}</h4>
                <span onClick={onClose} className="close-modal-icon">&times;</span>
                </div>
               
                <div style={bodyStyle && bodyStyle} className="modal-body">
                        {/* {body ? (
                          body
                        ) : 
                        <div>
                            <p>This is our model body</p>
                        </div>
                        } */}
                         {BodyComponent && <BodyComponent />}
                         

                          
                </div>
        </div>
    </div>
  )
}

export default ModalPopUp;