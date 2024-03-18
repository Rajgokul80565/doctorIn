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
import {ModalPopUp} from "../../components";
import { isBase64 } from '../../utils';
import { GiGooeyEyedSun } from "react-icons/gi";
import { FaBriefcaseMedical } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';




function Admindashboard() {

  const [openSide, setOpenSide] = useState(false);
  const {userInfo} = useSelector((state) => state.auth);
  const [patientDetails, setPatientDetails] = useState([]);
  const [ showModal, setShowModal] = useState(false);
  const [upcomingPatient, setUpcomingPatient] = useState({});
  const [file, setFile] = useState([]);
  const navigate = useNavigate();
  const [getPatientSchedules , {isloading, error}] = usePatientSchedulesMutation(); 
  const [getUpcomingPatient] = useGetUserDetailsByIdMutation();
  const [attendPatient, {isattendPatientLoading, attendPatientError}] = usePatientAttendMutation(); 


  console.log("doctorINFOS", userInfo);

  const getSchedulesDetails = async () => {
    let schedules = await getPatientSchedules({id:userInfo._id}).unwrap();
    setPatientDetails([...schedules.patientSchedule])
   
  }

  const getUpcomingPatientDetails =  async (patient) => {
 
      let upcoming = await getUpcomingPatient({id: patient?.userId}).unwrap();
      let newUpcomingDetails = {...patient,profilePicture: upcoming?.[0]?.profilePicture}
      setUpcomingPatient(newUpcomingDetails);
  }
  console.log("patientDetails", patientDetails);
  console.log("upcomingPatient", upcomingPatient);
  
  useEffect(() => {
    getSchedulesDetails();

  },[])

  useEffect(() => {
    // console.log("patientUseEffect", patientDetails[patientDetails.length -1]?.userId);
    if(patientDetails.length >= 1){
      getUpcomingPatientDetails(patientDetails[patientDetails.length -1]);
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
        bookingId:upcomingPatient?._id,
      }).unwrap();

      console.log("submit_patient", submit_patient, isattendPatientLoading);
     
        toast.success("Attended Patient");
        onClose();
       
 
    }else{
      toast.error("Something went wrong!. try again!");
    }

   } catch (error) {
    toast.error(error.message);
   }
           
  }


  const modalPopForm = () => {
//     <div id="patient_popup">
//     <section id="Model_profile_part">
//         <div id="modal_dp">
//             {isBase64(upcomingPatient?.profilePicture ) ? (
//                 <img style={{
//                     width: "65px",
//                     height:"65px",
//                     borderRadius: "50px",
//                 }} src={upcomingPatient?.profilePicture } alt="patient_image" />
//             ) : (
//                 <TfiLayoutPlaceholder id="patient_profileCard_icon" />
//             )}
//         </div>
//         <div id="model_profile_name">
//             <h2 id="patient_name_model">{patientDetails[0]?.userName}</h2>
//             <dl id="profile_details">
//                 <dt>Sex:</dt>
//                 <dd>{upcomingPatient?.gender}</dd>
//                 <dt>Age:</dt>
//                 <dd>{upcomingPatient?.age} years</dd>
//             </dl>
//             <div class="patient_model_box">
//                 <h3>65 <span>kg</span></h3> 
//                 <p>Weight</p>
//             </div>   
//             <div class="patient_model_box">
//                 <h3>65 <span>kg</span></h3> 
//                 <p>Weight</p>
//             </div>
//         </div>
//     </section>
//     <section id="patient_details">
//         <div id="reason_area">
//             <h3>Allergies</h3>
//             <p>...</p> 
//             <h3>Problems</h3>
//             <p>...</p> 
//         </div>
//         <div id="pdf_area">
//             <h3>Previous Documents</h3>
//             <p>...</p> 
//             <h3>Upload Documents</h3>
//             <p>...</p> 
//         </div>
//     </section>
// </div>

    let arrAllegie = ["wheat", "lemon", "penut"]
    let dumpy = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non optio est assumenda reiciendis ipsa laborum et, sint debitis quaerat nobis fugit, officia dicta esse modi voluptatem omnis, unde praesentium cupiditate? "
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
                    {arrAllegie?.map((aller,index) => (
                      <p index={index}>{aller},</p>
                    ))}
                </div>

              </div>
              <div id="problem-container" >
                <div className="allergy_header">
                <FaBriefcaseMedical style={{color:"rgb(81, 79, 79)"}}/> <p>Reason for Visit</p>
                </div>
                <div className="reason_allergie_content">
                  <p style={{paddingLeft:"17px"}}>{dumpy}</p>
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
                    <h6 id="today_schedule">Today Schedule</h6>
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
              <div id="right_result">
              {/* results here */}
</div>
            </div>
          </div>

    </div>
  )
}

export default Admindashboard