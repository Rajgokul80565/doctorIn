import React, {useState, useEffect} from 'react';
import "../userdashboard/userdashboardStyles.css";
import "./admindashboard.css";
import { FaArrowRight } from "react-icons/fa";

import {Dropzone} from "../../components";
import { LiaUserEditSolid } from "react-icons/lia";
import {  useNavigate } from "react-router-dom";
import { GrFormEdit } from "react-icons/gr";
import { useSelector} from "react-redux";
import { routes } from '../../routes/routes';
import {PatientCard, PDFViewer} from "../../components";
import {usePatientSchedulesMutation,usePatientAttendMutation } from "../../redux/slices/doctorSlice";
import {useGetUserDetailsByIdMutation} from "../../redux/slices/userSlice";
import {ModalPopUp, NextInLineCard} from "../../components";
import { isBase64, bookingStatus } from '../../utils';
import { GiGooeyEyedSun } from "react-icons/gi";
import { FaBriefcaseMedical } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';
import {Sidebar} from "../../components";




function Admindashboard() {

  const [openSide, setOpenSide] = useState(false);
  const {userInfo} = useSelector((state) => state.auth);
  const [patientDetails, setPatientDetails] = useState([]);
 const [updatedPatientDetails , setUpdatedPatientDetails] = useState([]);
  const [upcomingPatient, setUpcomingPatient] = useState({});
  const [file, setFile] = useState([]);
  const [ showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [getPatientSchedules , {isLoading: patientLoading, errors}] = usePatientSchedulesMutation(); 
  const [getUpcomingPatient, {isLoading: upcomingLoading, error}] = useGetUserDetailsByIdMutation();
  const [attendPatient, {isattendPatientLoading, attendPatientError}] = usePatientAttendMutation(); 


  console.log("doctorINFOS", userInfo);

  const getSchedulesDetails = async () => {
    let schedules = await getPatientSchedules({id:userInfo._id}).unwrap();
    setPatientDetails([...schedules.patientSchedule]);

   
  }

  const getUpcomingPatientDetails =  async (patient) => {
 
      let upcoming = await getUpcomingPatient({id: patient?.userId}).unwrap();
      let newUpcomingDetails = {...patient,profilePicture: upcoming?.[0]?.profilePicture}
      setUpcomingPatient(newUpcomingDetails);
  }
  console.log("patientDetails", patientDetails);
  console.log("upcomingPatient", upcomingPatient, );
  
  useEffect(() => {
    getSchedulesDetails();

  },[])

  useEffect(() => {
    // console.log("patientUseEffect", patientDetails[patientDetails.length -1]?.userId);
    if(patientDetails.length >= 1){
      getUpcomingPatientDetails(patientDetails[0]);
    }else{
      setUpcomingPatient({});
    }
  },[patientDetails]);

  const onClose = () => {
    setShowModal(false)
  }

  console.log("VITE_APP_API_URL",
  `${import.meta.env.VITE_APP_API_URL}/${upcomingPatient?.filePath}`, "****", "http://localhost:5000/uploads//1709660160189-12415407Rajgokul%20Resume%20(3).pdf");
  

   // 65e75800669a4a005a3520aa
   //65e75800669a4a005a3520aa
      console.log("jkkk", upcomingPatient);
 

  // userId, 
  // doctorName, 
  // doctorId,
  // reportName,
  // reportPath, 
  // reportStatus,
  const submitPatient = async () => {

    const formData = new FormData();
    console.log("fio", file[0]);
    formData.append("file", file[0]);
    console.log("formData", formData.get("file"));
    
   try {

    let result = await axios.post(
      "http://localhost:5000/api/upload/",
      formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
      }},
    );

    console.log("uploadFile", result);
    if(result?.data?.filename){

      let submit_patient = await attendPatient({
        userId:upcomingPatient?.userId,
        doctorName:upcomingPatient?.doctorName,
        doctorId:upcomingPatient?.doctorId,
        BookedDate:upcomingPatient?.bookingDateTime,
        reportName:result?.data?.filename,
        reportPath:result?.data?.path,
        reportStatus:true,
        reportStatusMessage:bookingStatus(1),
        bookingId:upcomingPatient?._id,

      }).unwrap();

      console.log("submit_patient", submit_patient, isattendPatientLoading);
     
        toast.success("Attended Patient");
        let updatedPatientList = patientDetails;
        updatedPatientList?.shift();
        console.log("updatedPatientList",updatedPatientList);
        setPatientDetails([...updatedPatientList]);
        setFile([]);
        onClose();
       
 
    }else{
      toast.error("Something went wrong!. try again!");
    }

   } catch (error) {
    toast.error(error.message);
   }
           
  }


  const modalPopForm = () => {
  
    return (
      <div id="patient_popup">
        <div id="Model_profile_part">
          
          <div id="modal_dp">
          {isBase64(upcomingPatient?.profilePicture ) ? (
                <img style={{
                  width: "65px",
                  height:"65px",
                  borderRadius: "50px",
                }} src={upcomingPatient?.profilePicture } alt="patient_image" />
        ) : ( <TfiLayoutPlaceholder id="patient_profileCard_icon" />)} 
          </div>
          <div id="model_profile_name">
                <p id="patient_name_model">{patientDetails[0]?.userName}</p>
                <div id="profile_details">
                  <p>Sex: {upcomingPatient?.gender}</p>
                  <p>Age: {upcomingPatient?.age} years</p>
                </div>
           </div>
           <div className="patient_model_box">
              <h6>65 <span>kg</span></h6> 
              <p>Weight</p>
            </div>   
            <div className="patient_model_box">
              <h6>65 <span>kg</span></h6> 
              <p>Weight</p>
            </div>  

        </div>
        <div id="patient_deatil_sec">
          <div id="reason_area">
              <div className="reason_allergies">
                <div className="allergy_header">
                    <GiGooeyEyedSun/> <p>Allergies</p>
                </div>
               
                <div className="reason_allergie_content">
                    {upcomingPatient?.allergies?.length > 0 ? upcomingPatient?.allergies?.map((aller,index) => (
                      <p index={index}>{aller},</p>
                    )) : <p>no allergies</p>}
                </div>

              </div>
              <div id="problem-container" >
                <div className="allergy_header">
                <FaBriefcaseMedical style={{color:"rgb(81, 79, 79)"}}/> <p>Reason for Visit</p>
                </div>
                <div className="reason_allergie_content">
                  <p style={{paddingLeft:"17px"}}>{upcomingPatient?.reasonForVisit}</p>
                </div>
              </div>
          </div>
          <div id="pdf_area">
          <div>
          
          <PDFViewer  title="YupPDF" pdfUrl={`${import.meta.env.VITE_APP_API_URL}${upcomingPatient?.filePath}`}/>
              </div>
              <div>
              <Dropzone  files={file} setfile={setFile} showDelete={true} />
              </div>
          </div>
          <div id="submit_patient">
            <button onClick={submitPatient}>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }

  console.log("isloadingUser", upcomingLoading, patientLoading);



  return (
    <div className={`main ${openSide ? "active" : "inactive"}`}>
       {/* <div className="sidebar_main">
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


        </div> */}
        <Sidebar openSide={openSide} setOpenSide={setOpenSide} />

        <div className="main_content">
        <div className="left_Main">
            <div className="left_userinfo">
              <div>
              <h6>Hello,</h6>
                  {userInfo?.name && (
                  <h6 id="username">Dr.{userInfo?.name}</h6>
                  )}
              </div>
                  {/* <CiSettings id="settingsIcon" /> */}
                  <LiaUserEditSolid onClick={() => navigate(routes.profile)} id="settingsIcon" />
                  {/* <IoMdSettings id="settingsIcon" /> */}
              </div>
              <div id="upcoming_cards">
                    <h6 className="today_schedule">Today Schedule</h6>
                    {/* {upcomingLoading ? <Spinner style={{width:"60px", height:"60px"}}/> : (
                      <>
                        {Object.keys(upcomingPatient).length >0 ? (
                          <PatientCard
                          patientName={upcomingPatient?.userName}
                          age={upcomingPatient?.age}
                          profilePicture={upcomingPatient?.profilePicture ? upcomingPatient?.profilePicture : "" }
                          showModal={showModal}
                          setShowModal={setShowModal}
                          ModalPopUp={ModalPopUp}
                          modalForm={modalPopForm}
                          onClose={onClose}
                          />
                      ) : (
                        <div>
                         <h6>No appointments today</h6>
                        </div>
                      )}
                      </>
                    )} */}
                     <PatientCard
                          patientName={upcomingPatient?.userName}
                          age={upcomingPatient?.age}
                          profilePicture={upcomingPatient?.profilePicture ? upcomingPatient?.profilePicture : "" }
                          showModal={showModal}
                          setShowModal={setShowModal}
                          ModalPopUp={ModalPopUp}
                          modalForm={modalPopForm}
                          onClose={onClose}
                          />
                   
                   
              </div>  
              <div id="in_line_patients">
                <h6 className="today_schedule">In line</h6>
           
              {patientDetails.slice(1).map((item) => (
                  <NextInLineCard profilePicture={upcomingPatient?.profilePicture}  patientName={item?.userName} gender={item?.gender} age={item?.age}/>
              ))}
           
             
              </div>
            </div>
            <div className="right_Main">
                  <div id="profile_content">
                    <div id="profile_card">
                      <div id="profile_nav">
                      <GrFormEdit onClick={() => navigate(routes.profile)} style={{cursor:"pointer"}} id="profile_edit_icon"/>
                      </div>
                    {/* userInfo?.profilePicture */}
                    <div id="profile_details">
                    <div id="profile_pic">
          {isBase64(userInfo?.profilePicture  ) ? (
                <img style={{
                  width: "65px",
                  height:"65px",
                  borderRadius: "50px",
                  objectFit: "cover",
                }} src={userInfo?.profilePicture } alt="doctor_image" />
        ) : ( <TfiLayoutPlaceholder id="patient_profileCard_icon" />)} 
                     </div>
                      <h4>{userInfo?.name}</h4>
                      <h6>{userInfo?.specialist}</h6>
                    </div>
                    <div id="active_patient">
                      <h5>Active patients</h5>
                      <div className="avatar-group">
                      
                      
                      <div className="avatar">
                      <img src="https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg"/>
                      </div>

                      <div className="avatar">
                      <img src="https://htmlstream.com/preview/unify-v2.6.2/assets/img-temp/400x450/img5.jpg"/>
                      </div>

                      <div className="avatar">
                      <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                      </div>

                      <div className="avatar">
                      <img src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/04/a0004213/img/basic/a0004213_main.jpg?20200710184501&q=80&rw=750&rh=536"/>
                      </div>
                      
                      <div className="avatar">
                      <img src="https://da4e1j5r7gw87.cloudfront.net/wp-content/uploads/sites/768/2018/08/glasses-american-man-20s-hipster.jpg"/>
                      </div>
                      <div className="hidden-avatars">
                        +10
                      </div>

                    </div>
                      {/* <div class="avatars">
                          <span className="avatar">
                                <img  src="https://picsum.photos/70"/>
                            </span>
                          <span className="avatar">
                                <img src="https://picsum.photos/80"/>
                            </span>
                          <span className="avatar">
                                <img src="https://picsum.photos/90"/>
                            </span>
                          
                      
                      </div> */}
                      {/* <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul> */}
                   

                    </div>

                    </div>
                  </div>
                  <div id="meeting_right">
                    <div id="meeting_content">
                    <h6 className="today_schedule">Team meeting</h6>
                    <div id="meeting_card">
                          <div id="left_side_meeting_card">
                             
                                  <h6 className='meeting_label'>Topic</h6>
                                  <h6 className="meeting_main">Daily brief</h6>
                            
                             
                                <h6 className='meeting_label'>Link</h6>
                                <h6 className="meeting_main"><a href="https://zoom.us/">Zoom video</a></h6>
                          
                           
                                  <h6 className='meeting_label'>Paticipants</h6>
                                  <h6 className="meeting_main">
                                    <div class="avatar-group">                 
                                      <div className="avatar2">
                                      <img src="https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
                                      </div>
                                      <div className="avatar2">
                                      <img src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
                                      </div>
                                      <div className="avatar2">
                                      <img src="https://img.freepik.com/free-photo/portrait-3d-female-doctor_23-2151107332.jpg?t=st=1712933622~exp=1712937222~hmac=11340b41f4f935b744717bf1eac9cba7c6f2ac44379688a9ea9bfc6811e2b560&w=900"/>
                                      </div>
                                      <div className="hidden-avatars2">
                                        +2
                                      </div>
                                    </div>
                                  </h6> 
                          </div>
                          <div id="right_side_meeting_card">
                            <div id="meeting_date_area">
                            <div id="meeting_date">
                                  <h4>Dec</h4>
                                  <h3>13</h3>
                              </div>
                            </div>
                              <div id="see_more_meeting">
                                  <h6 className='see_details'>See Details </h6>
                                  <FaArrowRight className="see_details"/>
                              </div>
                          </div>
                    </div>
                    </div>
          
                  </div>
            </div>
          </div>

    </div>
  )
}

export default Admindashboard