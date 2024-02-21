import React, {useState} from 'react';
import "./doctorcards.css";
import { TfiLayoutPlaceholder } from "react-icons/tfi"
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import {isBase64} from "../../utils";
import ModalPopUp from '../ModelPopup';
import BasicDateTimePicker from "../DateTimePicker"



function DoctorsCard({
  availabilityStatus = false,
  doctorName = "doctor",                 
  experience = 0,         
  profilePicture = "",                
  specialist = " ",
  id=" "
}) {

  // console.log("isBase64",isBase64(profilePicture));
  const [showModalPopup, setShowModalPopup] = useState(false);

    const onClose = () => {
      setShowModalPopup(false);
    }

  return (
    <div id="doctorcard_main">
       <div className="doctorcardProfile_sec">
        {isBase64(profilePicture) ? (
                <img style={{
                  width: "50px",
                  height:"50px",
                  borderRadius: "50px",
                }} src={profilePicture} alt="profile image" />
        ) : ( <TfiLayoutPlaceholder className="profileCard_Icon" />)} 
       
       <p>Dr.{doctorName}</p>
       </div>
       <div className="details_sec">
        <div className="details_item">
        <MdOutlineWorkOutline/>
          <p>{specialist}</p>
        </div>
        <div className="details_item">
    
        <MdWorkspacePremium/>
         <p>{experience} years of experience</p>
        </div>
        <div className="details_item">
        <MdAccessTime/>
        <p>Monday to Friday, 10am-5pm</p>
        </div>
       </div>
       <button onClick={() => setShowModalPopup(!showModalPopup)}>
        Book
       </button>
       {showModalPopup && <ModalPopUp 
       id={id} 
       body={<div>
        <label>select date and time</label>
        <BasicDateTimePicker/>
               </div>}
       onClose={onClose} 
       Header={"Book an appointment"} 
        />}
    </div>
  )
}

export default DoctorsCard;