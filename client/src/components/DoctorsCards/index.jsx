import React, {useState} from 'react';
import "./doctorcards.css";
import { TfiLayoutPlaceholder } from "react-icons/tfi"
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { useDispatch, useSelector} from "react-redux";
import { MdWorkspacePremium } from "react-icons/md";
import {isBase64} from "../../utils";
import ModalPopUp from '../ModelPopup';
import {convertToUTC} from "../../utils/validations";
import {useBookMutation} from "../../redux/slices/userSlice";
import { toast } from 'react-toastify';
import Dropzone from "../Dropzone";
import axios from "axios";
import Spinner from '../Loading spinner/Spinner';
import BasicDateTimePicker from "../DateTimePicker"


function DoctorsCard({
  availabilityStatus = false,
  doctorName = "doctor",                 
  experience = 0,         
  profilePicture = "",                
  specialist = " ",
  id=" "
}) {

  // console.log("isBase64",isBase64(profilePicture));
  const [showModalPopup, setShowModalPopup] = useState(false);
  const [date, setDate] = React.useState(null);
  const [files, setfile] = React.useState([]);
  const {userInfo} = useSelector((state) => state.auth);
  const [book, {isLoading, error}] = useBookMutation();

    const onClose = () => {
      setShowModalPopup(false);
    }

    const  onSubmit =  async () => {
      const formData = new FormData();
      console.log("fio", files[0]);
      formData.append("file", files[0]);
      console.log("formData", formData.get("file"));
      let bookDate = convertToUTC(date);
      console.log("bookDate", bookDate);
      
      try {
        let result = await axios.post(
          "http://localhost:5000/api/upload/",
          formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
          }},
        );

        if(result.data.filename){
            try {
                let booking  = await book({
                  userName:userInfo?.name,
                  userId:userInfo?._id,
                  doctorName:doctorName,
                  doctorId:id,
                  specialist:specialist,
                  bookingDateTime:bookDate,
                  status:true,
                }).unwrap();
                console.log("bookingRes", booking);
                if(isLoading === false){
                  toast.success("Appoinment Booked");
                  onClose();
                }
            } catch (error) {
              console.log("bookerror", error.message);
            }
        }else{
          console.log("noresult", result);
        }
      } catch (error) {
          console.log("error", error.message);
      }

     }

const ModalComps = () => {

      // console.log("isBase64",isBase64(profilePicture));
  // const [showModalPopup, setShowModalPopup] = useState(false);
  const [date, setDate] = React.useState(null);
  const [files, setfile] = React.useState([]);
  const [gender, setGender] = React.useState("");
  const [age, setAge] = useState(0);
  const {userInfo} = useSelector((state) => state.auth);
  const [book, {isLoading, error}] = useBookMutation();



    const  onSubmit =  async () => {
      const formData = new FormData();
      console.log("fio", files[0]);
      formData.append("file", files[0]);
      console.log("formData", formData.get("file"));
      let bookDate = convertToUTC(date);
      console.log("bookDate", bookDate);
      
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
            try {
                let booking  = await book({
                  userName:userInfo?.name,
                  userId:userInfo?._id,
                  doctorName:doctorName,
                  doctorId:id,
                  specialist:specialist,
                  bookingDateTime:bookDate,
                  status:true,
                  fileName:result?.data?.filename,
                  filePath:result?.data?.path,
                  age:age,
                  gender:gender,
                }).unwrap();
                console.log("bookingRes", booking);
                if(isLoading === false){
                  toast.success("Appoinment Booked");
                  onClose();
                }
            } catch (error) {
              console.log("bookerror", error.message);
              toast.success(error.message);
              onClose();
            }
        }else{
          console.log("noresult", result);
        }
      } catch (error) {
          console.log("error", error.message);
      }

     }

     console.log("ddea", gender,age );


    return (
   
     <>
     <div id="booking_model_userDetails">
                        <div>
                        <label className="modal_placeholder">select date(10 slots per day)</label>
                        <BasicDateTimePicker setTime={setDate}/>
                        </div>
                        <div className="booking_model_userDetails_divs">
                          <label className="modal_placeholder">age</label>
                          <input onChange={(e) => setAge(e?.target?.value)} value={age !== 0 ? age : ''}  className="booking_model_userDetails_input" type="number"  />
                        </div>
                        <div className="booking_model_userDetails_divs">
                        <label className="modal_placeholder" for="country">Gender</label>
                        <select onChange={(e)=> setGender(e?.target?.value)} className="booking_model_userDetails_input" id="gender" name="genders">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                          
                        </div>
                      
     </div>
     
                        <div>
                          <label className="modal_placeholder" >pervious medical report (not mandatory)</label>
                        <Dropzone files={files} setfile={setfile}/>
                        </div>

                        <div className="buttonDiv">
                          <button onClick={onSubmit} id="submitModalBtn" >
                          {isLoading ?  <Spinner style={{width: '25px', height:"25px"}}/> :  <p>Submit</p> }
                            </button>
                          <button onClick={onClose} id="cancelModalBtn">cancel</button>
                        </div>
     </>
     
    )
    
  }


   

  return (
    <div id="doctorcard_main">
       <div className="doctorcardProfile_sec">
        {isBase64(profilePicture) ? (
                <img style={{
                  width: "50px",
                  height:"50px",
                  borderRadius: "50px",
                  objectfit: "cover",
                }} src={profilePicture} alt="profile image" />
        ) : ( <TfiLayoutPlaceholder className="profileCard_Icon" />)} 
       
       <p>Dr.{doctorName}</p>
       </div>
       <div className="details_sec">
        <div className="details_item">
        <MdOutlineWorkOutline/>
          <p>{specialist}</p>
        </div>
        <div className="details_item">
    
        <MdWorkspacePremium/>
         <p>{experience} years of experience</p>
        </div>
        <div className="details_item">
        <MdAccessTime/>
        <p>10 slots available</p>
        </div>
       </div>
       <button id="doctor_card_btn" onClick={() => setShowModalPopup(!showModalPopup)}>
        Book
       </button>
       {showModalPopup && <ModalPopUp 
       id={id} 
     
       onClose={onClose} 
       BodyComponent={ModalComps}
       Header={"Book an appointment"} 
        />}
    </div>
  )
}

export default DoctorsCard;