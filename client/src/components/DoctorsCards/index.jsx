import React from 'react';
import "./doctorcards.css";
import { TfiLayoutPlaceholder } from "react-icons/tfi"

function DoctorsCard() {
  return (
    <div id="doctorcard_main">
       <div className="doctorcardProfile_sec">
       <TfiLayoutPlaceholder className="profileCard_Icon" />
       <p>Dr. Emily</p>
       </div>
       <div className="details_sec">
        <div className="details_item">
          <p>specialist:</p>
          <p>cardio</p>
        </div>
        <div className="details_item">
          <p>work:</p>
          <p>Monday to Friday, 10am-5pm</p>
        </div>
        <div className="details_item">
          <p>status:</p>
          <p>available</p>
        </div>
       </div>
    </div>
  )
}

export default DoctorsCard;