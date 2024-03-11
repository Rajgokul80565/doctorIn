import React from 'react'
import { TfiLayoutPlaceholder } from "react-icons/tfi"
import "./schedule.css";
import { IoTimeOutline } from "react-icons/io5";
import { isBase64 } from '../../utils';



function ScheduleCard({doctorName, specialist, bookDate, profilePicture}) {
  return (
    <div id="scheduleCard">
        <div id="schedule_doc_details">
            <div id="schedule_profile">
            {isBase64(profilePicture) ? (
                <img style={{
                  width: "50px",
                  height:"50px",
                  borderRadius: "50px",
                }} src={profilePicture} alt="profile image" />
        ) : ( <TfiLayoutPlaceholder className="profileCard_Icon" />)} 
            {/* <TfiLayoutPlaceholder className="scheduleCard_Icon" /> */}
            </div>
            <div id="schedule_doc_names">
                <p>Dr.{doctorName}</p>
                <h6>{specialist}</h6>
            </div>
        </div>
        <div id="schedule_time_details">
           <div id="schedule_time">
           <IoTimeOutline  id='timeIcon'/>
           <p>{bookDate}</p>
           </div>
        </div>
    </div>
  )
}

export default ScheduleCard;