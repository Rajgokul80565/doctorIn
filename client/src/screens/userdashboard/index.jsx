import React, {useState,useEffect} from 'react'
import "../userdashboard/userdashboardStyles.css";
import { IoMdHome } from "react-icons/io";
import { FaBloggerB } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import {ToolTip, DoctorsCard,ScheduleCard, PDFViewer} from "../../components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LiaUserEditSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import {useGetdoctorlistMutation, useGetUserScheduleMutation, useDoctorinfoMutation, useGetUserResultMutation} from "../../redux/slices/userSlice";
import { convertToBase64,convertUTCtoLocal } from "../../utils";
import { useDispatch, useSelector} from "react-redux";
import { routes } from '../../routes/routes';
import {formatDate, bookingStatus} from "../../utils"
import {setDoctorsList} from "../../redux/slices/doctorSlice";
import {setSchedulesList, setUserResults} from "../../redux/slices/userSlice";
import avatarOneImg from "../../assets/images/avatar1.jpg";
import avatarTwoImg from "../../assets/images/avatar2.jpg";
import avatarThreeImg from "../../assets/images/avatar3.jpg";
import dietHeaderImg from "../../assets/images/diet_header.jpg";
import { Cursor } from 'mongoose';
function UserDashboard() {

  const [openSide, setOpenSide] = useState(false);
  const {userInfo} = useSelector((state) => state.auth);
  const {doctorsList} = useSelector((state) => state.doctor);
  const {schedulesList, userResults} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [profile, setProfile] = useState("");
  // const [docList, setDocList ] = useState([]);
  // const [scheduleList, setScheduleList] = useState([]);
  const [doctorinfos, setDoctorInfos] = useState(null);
  const [newSchedule,setNewSchedule] = useState({});
  const navigate = useNavigate();
  const [getDoctorsList,{isLoading, error} ] = useGetdoctorlistMutation();
  const [getSchedule, {loading, isError} ] = useGetUserScheduleMutation();
  const [doctorInfos, {infoLoading, infoError}] = useDoctorinfoMutation();
  const [getUserResults] = useGetUserResultMutation();



  const handleProfileImg = async (e) => {
      let selectedFile = e?.target?.files?.[0];
      let base64Format = await convertToBase64(selectedFile);
      setProfile(base64Format);
     
  }


  const getDocList =  async () => {
      const docs =  await getDoctorsList().unwrap();
      console.log("docs",docs)
      dispatch(setDoctorsList([...docs]));
    
  }

  const getUerResults = async () => {
    const userResults = await getUserResults().unwrap();
    console.log("result", userResults);
    dispatch(setUserResults([...userResults?.results]));


  }
  

  const getScheduleList = async () => {
      const schedules = await getSchedule().unwrap();

      console.log("schedulesAll", schedules);
      dispatch(setSchedulesList([...schedules?.appointmentList]))

      // setScheduleList([...schedules?.appointmentList]);
      setNewSchedule({...schedules?.appointmentList[schedules?.appointmentList?.length - 1]})
      let newSc = {...schedules?.appointmentList[schedules?.appointmentList?.length - 1]};
      console.log("newSc", newSc);
      doctorInfo(newSc?.doctorId)
  }

  const doctorInfo =  async (id) => {
    debugger;
    try {
      let infos = await doctorInfos({id:id}).unwrap();
      console.log("infos", infos);
      setDoctorInfos(infos?.doctorDetail);
    } catch (error) {
      console.log("infosError", error);
    }
  }
  // const getDoctorData = async (id) => {
     
  //   const doctorData = await getDoctorDetails({id:"65c27a4f06389d99878add96"}).unwrap();
  //   console.log("doctorData", doctorData);
  // }
  console.log("schedulesList", schedulesList);
  console.log("userResults", userResults);
  console.log("doctorsList", doctorsList);



  useEffect(() => {
    getDocList();
    getScheduleList();
    doctorInfo();
    getUerResults();
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
              <div id="left_blog">
                  <div id="blog_card">
                    <img id="avatar1" src={avatarOneImg} alt="avatar" />
                    <img id="avatar2" src={avatarTwoImg} alt="avatar" />
                    <img id="avatar3" src={avatarThreeImg} alt="avatar" />
                      <div id="blog_curve">
                      
                      </div>
                      <div id='blogcard_content'>
                        <h4>See what our experts say!</h4>
                          <h6>blogs</h6>
                      </div>
                  </div>
                  <div id="diet_card">
                    <div id="diet_header">
                      <img src={dietHeaderImg} alt="diet-image" />
                    </div>  
                    {/* <img id="avatar1" src={avatarOneImg} alt="avatar" />
                    <img id="avatar2" src={avatarTwoImg} alt="avatar" />
                    <img id="avatar3" src={avatarThreeImg} alt="avatar" /> */}
                     
                      <div id='blogcard_content'>
                        <h4>Check diet for you!</h4>
                          <h6>Food diet</h6>
                      </div>
                  </div>
              </div>
              <div id="left_result">
              {/* results here */}
              <h6 className="reports">Reports</h6>
                  <div id="result_container">
                    {userResults?.length > 0 ? (
                      <>
                      {userResults?.map((result) => {
                        return (
                        <PDFViewer style={{cursor:"pointer"}} title="report1" pdfUrl={`${import.meta.env.VITE_APP_API_URL}${result?.reportPath}`} />
                       
                      )})}
                      
                      </>
                    ) : (
                      <h6>No reports, yet!</h6>
                    )}
                      
                  </div>
</div>
            </div>

            <div className="right_Main">
            <div className="doctor_list_container_1">
            <IoIosArrowBack onClick={sliderLeft} className="card_slider_icon"/>
            <div id='card_slider'>
              {doctorsList?.length > 0 && (
                doctorsList?.map((doc) =>{
                  return (
                    <div key={doc._id} className="card_slider_item">
                    <DoctorsCard 
                    availabilityStatus={doc?.availabilityStatus}
                    doctorName={doc?.doctorName}                    
                    experience={doc?.experience}              
                    profilePicture={doc?.profilePicture}                    
                    specialist={doc?.specialist}
                    id={doc?._id}
                    doctorInfo={doctorInfo}
                    setNewSchedule={setNewSchedule}
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
                  <div id="schedule_header">
                    <p>Your Schedule</p>
                    <span>see all</span>
                  </div>
                  <div id="schedule_content">
                    {schedulesList.length > 0 ? (
                       <ScheduleCard
                       doctorName={newSchedule.doctorName}
                       specialist={newSchedule.specialist}
                       bookDate={formatDate(newSchedule.bookingDateTime)}
                       profilePicture={doctorinfos?.profilePicture || ""}
                       status={newSchedule?.statusMessage ? newSchedule?.statusMessage : null}
                      />
                    ) : (
                      <h6 id='no_appointment'>No appointments schedule, yet!.</h6>
                    )}
                 
                    {/* {scheduleList.length > 0 ? (
                         scheduleList.map((item) => {
                           return (
                           <ScheduleCard />
                         )})
                    ) : (
                      <p>No schedule here yet. Book your doctors</p>
                    )} */}
                
                  </div>
            </div>
           
            </div>
        </div>
    </div>
  )
}

export default UserDashboard