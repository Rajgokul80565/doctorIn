import React, {useState, useEffect} from 'react';
import "../App.css";
// import { ReactComponent as LoginImg } from "../../public/images/login_img.svg"
import SignupImg from "../assets/images/signUp2.svg"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import profilePlaceholder from "../assets/images/profile2.jpg"
import { Link, useNavigate } from "react-router-dom";
import {routes} from "../routes/routes";
import { useDispatch, useSelector} from "react-redux";
import {useUpdateprofileMutation} from "../redux/slices/userSlice";
import {setCrenditails} from "../redux/slices/authslice"
import { toast } from 'react-toastify';
import {validateEmail} from "../utils";
import { FaEdit } from "react-icons/fa";
import { convertToBase64 } from "../utils";
import Spinner from '../components/Loading spinner/Spinner';
// import { CiEdit } from "react-icons/ci";
import { bcrypt } from 'bcryptjs';

function ProfileScreen() {

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const {userInfo} = useSelector((state) => state.auth);
  const [status, setStatus] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateprofile, {isLoading, error}] = useUpdateprofileMutation();
  const navigate = useNavigate();

  console.log("isLoading", isLoading);

  useEffect(()=> {
    if(userInfo){
      // setName(userInfo?.name);
      // setEmail(userInfo?.email);
      // setProfile(userInfo?.profilePicture);
      setFormData({
        name:userInfo?.name,
        email:userInfo?.email,
        profilePicture:userInfo?.profilePicture,
        specialist:userInfo?.specialist,
        experience:userInfo?.experience,
        // availabilityStatus: userInfo?.availabilityStatus,

      });
      setStatus(userInfo?.availabilityStatus);
    }
  },[userInfo?.name, userInfo?.email])

  console.log("updateProfile", userInfo); 

 

  const handleChange = (e) => {
    console.log("working...", e.target.id, e.target.value);
      setFormData({...formData, [e.target.id]:e.target.value});
  }

  let switchPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  }

  const onSubmitUpdate = async(e) => {
    e.preventDefault();
    formData.status = status;
    console.log("formData", formData);

    if(validateEmail(formData?.email)) {
      try {
        let res = await updateprofile({_id:userInfo._id,...formData}).unwrap();
        console.log("resss", res);
        dispatch(setCrenditails({...res}));   
        toast.success("Profile updated!");
        if(userInfo?.roleType == 1){
        navigate(routes.doctorHome);
      }else{
        navigate(routes.userHome);
      }
      } catch (error) {
        console.log("err", error.message);
        toast.error(error.data.message || error.message);
      }
    }else{
      toast.error("Invalid email!");
    }
  }

  const handleProfileImg = async (e) => {
      let selectedFile = e?.target?.files?.[0];
      let base64Format = await convertToBase64(selectedFile);
      // setProfile(base64Format);
     setFormData({...formData, profilePicture:base64Format});
  }

  console.log("checkbox", status);

  return (
    <div id="profileMain">
        <div id="profileDiv">
          <div className='left_profile_div'>
          <div className='profile_header'>
          <h3>Profile & setting</h3>
          </div>
          <div className='profile_type'>
          <p>Personal Info</p>
          </div>
          
          </div>
          
          <div className='right_profile_div'>
            <div className='upper_right_ptofile'>
            <div className='update-btn-card'>               
             <h3 className='update-btn-card_content'>Personal Info</h3>
              <p>You can update your profile photo and details here</p>
            </div>
              <div className='update-btn-div' >
              <button onClick={onSubmitUpdate}>
                {isLoading ?  <Spinner style={{width: '25px', height:"25px"}}/> :  <p>Update</p> }
                </button>
              <button onClick={() => navigate(userInfo?.roleType == 1 ? routes.doctorHome : routes.userHome)}>cancel</button>
            </div>
            </div>
            <div className="profile_details">
                <div className="profile_upload_div">
                  <label htmlFor="file-upload">
                    <input
                    type="file"
                    name="profileFile"
                    id="file-upload" 
                    style={{display: 'none'}}
                    accept='.jpeg, .png, .jpg'
                    onChange={(e) => handleProfileImg(e)}
                    />
                                        <img className='profile_image' src={formData.profilePicture || profilePlaceholder} alt="profile image" />
                    <FaEdit className="profile_edit_icon"/>
                    </label>
                </div>
              
                <div id="profile_form_main">
                    <div  className="profile_input">
                        <label>Name</label>
                        <input type="text" value={formData?.name} id="name" onChange={(e) => handleChange(e)} name="name" />
                    </div>
                  
                    <div  className="profile_input">
                        <label>Email</label>
                        <input disabled={true} type="text" id='email'  value={formData?.email} onChange={(e) => handleChange(e)} name="email"  />
                    </div>
                    <div  className="profile_input">
                        <label>Password</label>
                        <input type="password" id='password' name='password' value={formData?.password} onChange={(e) => handleChange(e)}/>
                    </div>
                    {userInfo?.roleType == 1 && (
                      <>
                      <div className="profile_input">
                        <label>Specialist</label>
                        <input type="text" id='specialist' name='specialist' value={formData?.specialist} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="profile_input">
                        <label>Experience</label>
                        <input type="number" id='experience' name='experience' value={formData?.experience} onChange={(e) =>handleChange(e)}/>
                    </div>
                    <div className="profile_input">
                        <label>Availability Status</label>
                        <div>
                        <label class="switch">
                          <input type="checkbox" id="availabilityStatus" value={status} checked={status && "checked"} onChange={(e) => setStatus(!status)} />
                          <span class="slider"><p>online</p></span>
                        </label>
                        </div>
                    </div>
                      </>
                    )}
                   
                </div>
            </div>
          </div>
        </div>
    </div>
    // <div id='logMainLayer'>
    //     <div id='logLeft'>
    //       <img className='loginLeftImg' src={SignupImg} alt="login image" />
    //     </div>
    //     <div id='logRight'>
    //     <div className='logSignCard'>
    //       <div className='logSignFirstCard'>
    //       <h2 className='welcomeText'>Update profile</h2>
    //       <h6 className='secondaryWelcome'>please enter your details</h6>
    //       </div>
    //       <div className='logSignFormDiv'>
    //       <label htmlFor="email">Name</label>
    //           <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" />
    //           <label htmlFor="email">Email</label>
    //           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
    //           <label htmlFor="email">Password</label>
    //           <div className='passwordField'>
    //           <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
    //           { eyeIcon ? <FaRegEye onClick={switchPassword} className='passwordEyeIcon' /> : <FaRegEyeSlash onClick={switchPassword} className='passwordEyeIcon'/> }
    //           </div>
    //       </div>
    //       <div className='signBtnDiv'>
    //       <button onClick={onSubmitUpdate} className='btn-log'>Update</button>
    //       </div>
    //     </div>
    //     </div>
        
         
    // </div>
  )
}

export default ProfileScreen;
