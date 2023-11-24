import React, {useState} from 'react';
import "../App.css";
// import { ReactComponent as LoginImg } from "../../public/images/login_img.svg"
import SignupImg from "../assets/images/signUp2.svg"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {routes} from "../routes/routes";

function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);

  let switchPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  }

  return (
    <div id='logMainLayer'>
        <div id='logLeft'>
          <img className='loginLeftImg' src={SignupImg} alt="login image" />
        </div>
        <div id='logRight'>
        <div className='logSignCard'>
          <div className='logSignFirstCard'>
          <h2 className='welcomeText'>Welcome</h2>
          <h6 className='secondaryWelcome'>please enter your details</h6>
          </div>
          <div className='logSignFormDiv'>
          <label htmlFor="email">Name</label>
              <input type="text" name="name" />
              <label htmlFor="email">Email</label>
              <input type="text" name="email" />
              <label htmlFor="email">Password</label>
              <div className='passwordField'>
              <input type={showPassword ? "text" : "password"} name="password" />
              { eyeIcon ? <FaRegEye onClick={switchPassword} className='passwordEyeIcon' /> : <FaRegEyeSlash onClick={switchPassword} className='passwordEyeIcon'/> }
              </div>
          </div>
          <div className='signBtnDiv'>
          <button className='btn-log'>Sign up</button>
          <p>already have an account, <Link to={routes.login}><a href=''>Login</a> </Link></p> 
          </div>
        </div>
        </div>
         
    </div>
  )
}

export default SignUp;
