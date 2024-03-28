import React, {useState, useEffect} from 'react';
import "../userdashboard/userdashboardStyles.css";
import "./admindashboard.css";
import { IoMdHome } from "react-icons/io";
import { FaBloggerB } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import {ToolTip, Dropzone} from "../../components";
import { LiaUserEditSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
// import profilePlaceHolder from "../../assets/images/profile2.jpg";
// import { convertToBase64 } from "../../utils";
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
import Spinner from '../../components/Loading spinner/Spinner';




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
                  <h6 id="username">Dr.{userInfo?.name}</h6>
                  )}
              </div>
                  {/* <CiSettings id="settingsIcon" /> */}
                  <LiaUserEditSolid onClick={() => navigate(routes.profile)} id="settingsIcon" />
                  {/* <IoMdSettings id="settingsIcon" /> */}
              </div>
              <div id="upcoming_cards">
                    <h6 className="today_schedule">Today Schedule</h6>
                    {upcomingLoading ? <Spinner style={{width:"60px", height:"60px"}}/> : (
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
                    )}
                   
                   
              </div>  
              <div id="in_line_patients">
                <h6 className="today_schedule">In line</h6>
            <div id="nextLineCard">
              {patientDetails.slice(1).map((item) => (
                  <NextInLineCard profilePicture={upcomingPatient?.profilePicture}  patientName={item?.userName} gender={item?.gender} age={item?.age}/>
              ))}
            </div>
             
              </div>
            </div>
          </div>

    </div>
  )
}

export default Admindashboard