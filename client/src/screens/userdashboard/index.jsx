import React, {useState} from 'react'
import "../userdashboard/userdashboardStyles.css";
import { IoMdHome } from "react-icons/io";
import { FaBloggerB } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import {ToolTip, DoctorsCard} from "../../components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


function UserDashboard() {

  const [openSide, setOpenSide] = useState(false);

  const sliderLeft = () => {
    debugger;
    let sliderback = document.getElementById("card_slider");
    sliderback.scrollLeft = sliderback.scrollLeft - 550;
  }

  const sliderRight = () => {
    debugger;
    let sliderForward = document.getElementById("card_slider");
    sliderForward.scrollLeft = sliderForward.scrollLeft + 550;
  }

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
            <div className="left_Main">LeftMain</div>
            <div className="right_Main">
            <div className="doctor_list_container_1">
            <IoIosArrowBack onClick={sliderLeft} className="card_slider_icon"/>
            <div id='card_slider'>
            <div className="card_slider_item">
            <DoctorsCard />
            </div>
            <div className="card_slider_item">
            <DoctorsCard />
            </div>
            <div className="card_slider_item">
            <DoctorsCard />
            </div>
            <div className="card_slider_item">
            <DoctorsCard />
            </div>
            <div className="card_slider_item">
            <DoctorsCard />
            </div>
            <div className="card_slider_item">
            <DoctorsCard />
            </div>
            <div className="card_slider_item">
            <DoctorsCard />
            </div>
            <div className="card_slider_item">
            <DoctorsCard />
            </div>
            <div className="card_slider_item">
            <DoctorsCard />
            </div>
            </div>
            <IoIosArrowForward onClick={sliderRight} className="card_slider_icon"/>
            </div>
            <div className="doctor_list_container_2">
            
            </div>
           
            </div>
        </div>
    </div>
  )
}

export default UserDashboard