import React from 'react';
import "./doctorcards.css";
import { TfiLayoutPlaceholder } from "react-icons/tfi"
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";


function DoctorsCard() {
  return (
    <div id="doctorcard_main">
       <div className="doctorcardProfile_sec">
       <TfiLayoutPlaceholder className="profileCard_Icon" />
       <p>Dr. Emily</p>
       </div>
       <div className="details_sec">
        <div className="details_item">
        <MdOutlineWorkOutline/>
          <p>cardiologist</p>
        </div>
        <div className="details_item">
    
        <MdWorkspacePremium/>
         <p>7 years of experience</p>
        </div>
        <div className="details_item">
        <MdAccessTime/>
        <p>Monday to Friday, 10am-5pm</p>
        </div>
       </div>
    </div>
  )
}

export default DoctorsCard;