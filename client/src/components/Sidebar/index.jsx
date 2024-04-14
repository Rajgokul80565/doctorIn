import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { IoMdHome } from "react-icons/io";
import { FaBloggerB } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import {ToolTip} from "../index";
import { routes } from '../../routes/routes';

function Sidebar({openSide, setOpenSide}) {
    const {userInfo} = useSelector((state) => state.auth);
    let routing = [routes?.userHome,routes?.doctorHome];
    const navigate = useNavigate();
    
  return (
    <div className="sidebar_main">
    <ToolTip text="Home" show={openSide}>
    <div  className="sidebar_main_item" onClick={() => navigate(`${routing[userInfo?.roleType]}`)}>
    <IoMdHome className='sidebar_icon'/>
    { openSide && <h6>Home</h6>}
      
    </div>
    </ToolTip>
    <ToolTip text="blogs"  show={openSide}>
    <div className="sidebar_main_item" onClick={() => navigate(routes?.userBlog)}>
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
  )
}

export default Sidebar