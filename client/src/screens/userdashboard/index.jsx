import React, {useState,useEffect} from 'react'
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
import {useGetdoctorlistMutation} from "../../redux/slices/userSlice";
import { convertToBase64 } from "../../utils";

import { useDispatch, useSelector} from "react-redux";
import { routes } from '../../routes/routes';


function UserDashboard() {

  const [openSide, setOpenSide] = useState(false);
  const {userInfo} = useSelector((state) => state.auth);
  const [profile, setProfile] = useState("");
  const [docList, setDocList ] = useState([]);
  const navigate = useNavigate();
  const [getDoctorsList,{isLoading, error} ] = useGetdoctorlistMutation();

  const handleProfileImg = async (e) => {
      let selectedFile = e?.target?.files?.[0];
      let base64Format = await convertToBase64(selectedFile);
      setProfile(base64Format);
     
  }


  const getDocList =  async () => {
      const docs =  await getDoctorsList().unwrap();
      setDocList([...docs])
    
  }
  console.log("SetdocList", docList);



  useEffect(() => {
    getDocList();
  },[])


  const sliderLeft = () => {
    debugger;
    let sliderback = document.getElementById("card_slider");
    sliderback.scrollLeft = sliderback.scrollLeft - 550;
  }
  console.log("userDashboard", userInfo);
  const sliderRight = () => {
    debugger;
    let sliderForward = document.getElementById("card_slider");
    sliderForward.scrollLeft = sliderForward.scrollLeft + 550;
  }


  
// email: "ali@gmail.com"
// name: "Ali Abdaal"
// roleName: "patient"
// roleType: 0
// _id: "658449ebdaf1cdade7bcd952"

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
            <div className="left_Main">
            <div className="left_userinfo">
              <div>
              <h6>Hello,</h6>
                  {userInfo?.name && (
                  <h6 id="username">{userInfo?.name}</h6>
                  )}
              </div>
                  {/* <CiSettings id="settingsIcon" /> */}
                  <LiaUserEditSolid onClick={() => navigate(routes.profile)} id="settingsIcon" />
                  {/* <IoMdSettings id="settingsIcon" /> */}
              </div>
              <div id="right_blog">
            
              </div>
              <div id="right_result">
              {/* results here */}
</div>
            </div>

            <div className="right_Main">
            <div className="doctor_list_container_1">
            <IoIosArrowBack onClick={sliderLeft} className="card_slider_icon"/>
            <div id='card_slider'>
              {docList.length > 0 && (
                docList.map((doc) =>{
                  return (
                    <div key={doc._id} className="card_slider_item">
                    <DoctorsCard 
                    availabilityStatus={doc?.availabilityStatus}
                    doctorName={doc?.doctorName}                    
                    experience={doc?.experience}              
                    profilePicture={doc?.profilePicture}                    
                    specialist={doc?.specialist}
                    id={doc?.id}
                    />
                  </div>
                  )
                } )
              )}
              
            
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