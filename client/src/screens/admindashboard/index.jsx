import React, {useState} from 'react';
import "../userdashboard/userdashboardStyles.css";
import { IoMdHome } from "react-icons/io";
import { FaBloggerB } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import {ToolTip, DoctorsCard} from "../../components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LiaUserEditSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import profilePlaceHolder from "../../assets/images/profile2.jpg";
import { convertToBase64 } from "../../utils";

import { useDispatch, useSelector} from "react-redux";
import { routes } from '../../routes/routes';

function Admindashboard() {

  const [openSide, setOpenSide] = useState(false);
  return (
    <div className={`main ${openSide ? "active" : "inactive"}`}>
       <div className="sidebar_main">
        <ToolTip text="Home" show={openSide}>
        <div  className="sidebar_main_item">
        <IoMdHome className='sidebar_icon'/>
        { openSide && <h6>Home</h6>}
          
        </div>
        </ToolTip>
        <ToolTip text="blogs"  show={openSide}>
        <div className="sidebar_main_item">
        <FaBloggerB />
        { openSide && <h6>Blogs</h6>}
       
        </div>
        </ToolTip>
        {openSide ? (
          <div onClick={() => setOpenSide(!openSide)} className="sidebar_main_item sidebar_btn">
          <FaArrowLeft className="sidebar_btn_icon"/>
        </div>
        ) : (
          <div onClick={() => setOpenSide(!openSide)} className="sidebar_main_item sidebar_btn">
        <FaArrowRight />
        </div>
         
        )}


        </div>

        <div className="main_content">
          </div>

    </div>
  )
}

export default Admindashboard