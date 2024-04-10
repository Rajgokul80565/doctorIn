import React, {useState} from 'react';
import "./doctorcards.css";
import { TfiLayoutPlaceholder } from "react-icons/tfi"
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { useDispatch, useSelector} from "react-redux";
import { MdWorkspacePremium } from "react-icons/md";
import {isBase64, bookingStatus} from "../../utils";
import ModalPopUp from '../ModelPopup';
import {convertToUTC} from "../../utils/validations";
import {useBookMutation} from "../../redux/slices/userSlice";
import { toast } from 'react-toastify';
import Dropzone from "../Dropzone";
import {InputTags} from "../../components";
import axios from "axios";
import Spinner from '../Loading spinner/Spinner';
import BasicDateTimePicker from "../DateTimePicker";
import {setSchedulesList} from "../../redux/slices/userSlice";
import { GiGooeyEyedSun } from "react-icons/gi";


function DoctorsCard({
  availabilityStatus = false,
  doctorName = "doctor",                 
  experience = 0,         
  profilePicture = "",                
  specialist = " ",
  id=" ",
  doctorInfo,
  setNewSchedule
}) {

  // console.log("isBase64",isBase64(profilePicture));
  const [showModalPopup, setShowModalPopup] = useState(false);
  const [date, setDate] = React.useState(null);
  const [files, setfile] = React.useState([]);
  const {userInfo} = useSelector((state) => state.auth);
  const {schedulesList}  = useSelector((state) => state.user);
  const [book, {isLoading, error}] = useBookMutation();
  const dispatch = useDispatch();

    const onClose = () => {
      setShowModalPopup(false);
    }

const ModalComps = () => {

      // console.log("isBase64",isBase64(profilePicture));
  // const [showModalPopup, setShowModalPopup] = useState(false);
  const [date, setDate] = React.useState(null);
  const [files, setfile] = React.useState([]);
  const [gender, setGender] = React.useState("Male");
  const [age, setAge] = useState(0);
  const [reasonForVisit, setReasonForVisit] = React.useState("");
  const [allergyInput, setAllergyInput] = React.useState("")
  const [allergyList, setAllergyList] = React.useState([]);
  const {userInfo} = useSelector((state) => state.auth);
  const [book, {isLoading, error}] = useBookMutation();

  console.log("sss234", reasonForVisit, allergyList, schedulesList);

  const removeAllergy = (index) => {
      setAllergyList(prevAllergy => prevAllergy.filter((_,i) => i != index))
  }

    const handleChange = (e) => {
      if(e.key === "Enter" && e.target.value !== ""){
        setAllergyList([...allergyList, allergyInput]);
        setAllergyInput("");
      }
      if(e.key === "Backspace" && allergyList.length > 0 && e.target.value === ""){
      allergyList.pop();
       setAllergyList([...allergyList]);
      }
    }

    const  onSubmit =  async () => {
      const formData = new FormData();
      console.log("fio", files[0]);
      formData.append("file", files[0]);
      console.log("formData", formData.get("file"));
      let bookDate = convertToUTC(date);
      console.log("bookDate", bookDate, age, gender);
      
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
                  statusMessage:bookingStatus(0),
                  fileName:result?.data?.filename,
                  filePath:result?.data?.path,
                  age:age,
                  allergies: allergyList, 
                  reasonForVisit:reasonForVisit,
                  gender:gender,
                }).unwrap();
                console.log("bookingRes", booking?._doc);
                dispatch(setSchedulesList([...schedulesList, booking?._doc]))
                doctorInfo(booking?._doc?.doctorId);
                setNewSchedule({...booking?._doc})

                if(isLoading === false){
                  toast.success("Appoinment Booked");
                  onClose();
                }
            } catch (error) {
              console.log("bookerror", error.message);
              toast.error(error.message);
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
   
     <div id="booking_model">
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
     <div id="booking_model_userDetails">
      <div id="allergy_container">
        
      <label className="modal_placeholder" >Allergy</label>
          <div id="allergy_input">


                {allergyList.length > 0 && allergyList.map((item, index) => {
                  return (
                    <InputTags text={item} key={index} onClick={() => removeAllergy(index)}/>
                  );
                })}

           
                <input 
                type="text"
                value={allergyInput}
                placeholder='Type and press "Enter" to add'
                onChange={(e) => setAllergyInput(e.target.value)}
                onKeyDown={(e) =>handleChange(e)}
                 />
           
          </div>
      </div>
      <div id="reason_container">
           
      <label className="modal_placeholder" >Reason for visit</label>
            <div id="reason_input_div">
                  <textarea value={reasonForVisit} onChange={(e) => setReasonForVisit(e.target.value)} name="reason_for_visit" id="reasonforvisit" cols="35" rows="5"></textarea>
            </div>
      </div>
     </div>
     <div id="booking_model_userDetails">
                        <div id="booking_model_upload_contaier">
                          <label className="modal_placeholder" >pervious medical report (not mandatory)</label>
                        <Dropzone  files={files} setfile={setfile} showDelete={true}/>
                        </div>
                        </div>
                        <div id="booking_model_userDetails">
                        <div className="buttonDiv">
                          <button onClick={onSubmit} id="submitModalBtn" >
                          {isLoading ?  <Spinner style={{width: '25px', height:"25px"}}/> :  <p>Submit</p> }
                            </button>
                          <button onClick={onClose} id="cancelModalBtn">cancel</button>
                        </div>
                        </div>
     </div>
     
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