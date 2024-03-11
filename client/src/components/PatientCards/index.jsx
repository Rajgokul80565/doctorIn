import React from 'react'
import { TfiLayoutPlaceholder } from "react-icons/tfi"
import "./patientcard.css";
import { FaArrowRight } from "react-icons/fa";
import { isBase64 } from '../../utils';



function PatientCard({
    patientName,
    age, 
    lastvisit,
    docs,
    bookDate, 
    profilePicture,
    ModalPopUp,
    modalForm,
    showModal, 
    setShowModal,
    onClose
  }) {
  return (
    <div id="patientCard">
        <div id="patient_card_header"><p>upcoming patient</p></div>
        <div id="patient_card_profile">
        {isBase64(profilePicture) ? (
                <img style={{
                  width: "50px",
                  height:"50px",
                  borderRadius: "50px",
                }} src={profilePicture} alt="patient_image" />
        ) : ( <TfiLayoutPlaceholder id="patient_profileCard_icon" />)} 
        <div id="patient_names">
                <h5>{patientName}</h5>
                <h6>32 years</h6>  
        </div>
        </div>
        <div id="patient_card_footer">
            <div id="patientcard_footer_left">
              <div id="patientcard_last_visit">

              <p>last visit month ago</p>
            </div>
              </div>
            <div id="patientcard_footer_right">
              <p onClick={() => setShowModal(!showModal)}>see details</p> <FaArrowRight/>
               </div>
               {showModal && 
               <ModalPopUp
               id={1} 
     
               onClose={onClose} 
               BodyComponent={modalForm}
               Header={"Patient Details"} 
               /> }
        </div>
    </div>
  )
}

export default PatientCard;