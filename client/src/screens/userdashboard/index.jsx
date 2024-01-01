import React from 'react'
import "../userdashboard/userdashboardStyles.css";
import { IoMdHome } from "react-icons/io";
import { FaBloggerB } from "react-icons/fa6";

function UserDashboard() {
  return (
    <div className='main'>
        <div className="sidebar_main">
        <div className="sidebar_main_item">
        <IoMdHome className='sidebar_icon'/>
          <h6>Home</h6>
        </div>
       
        <div className="sidebar_main_item">
        <FaBloggerB />
          <h6>Blogs</h6>
        </div>
        </div>
        <div className="main_content">
          maincontent
        </div>
    </div>
  )
}

export default UserDashboard