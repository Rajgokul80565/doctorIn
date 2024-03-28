import React from 'react';
import "./nextinline.css";
import { BsPersonFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

function NextInLineCard({ patientName,profilePicture, gender, age}) {
  return (
    <div id="line_card_main_container">
         <div id="line_card_dp_container">
         <BsPersonFill style={{color:"#9622ee", fontSize:"28px"}} />
        </div>   
        <div id="line_card_patientDetails">
            <p id="line_card_patientName">{patientName}</p>
           
            <div id="line_card_age_gender">
            <p>Gender: {gender}</p>
            <p>Age: {age}</p>
            </div>
            
        </div>
        <div id="line_card_more_details">
        <IoIosArrowForward style={{color:"black", fontSize:"19px"}}/>
          </div>    
    </div>
  )
}

export default NextInLineCard;