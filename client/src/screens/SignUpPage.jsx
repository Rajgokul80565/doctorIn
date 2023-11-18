import React, {useState} from 'react';
import "../App.css";
// import { ReactComponent as LoginImg } from "../../public/images/login_img.svg"
import LoginImg from "../assets/images/login_img.svg"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);

  let switchPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  }

  return (
    <div id='logMainLayer'>
        <div id='logLeft'>
          <img className='loginLeftImg' src={LoginImg} alt="login image" />
        </div>
        <div id='logRight'>
        <div className='logSignCard'>
          <div className='logSignFirstCard'>
          <h2 className='welcomeText'>Welcome back!</h2>
          <h6 className='secondaryWelcome'>please enter your details</h6>
          </div>
          <div className='logSignFormDiv'>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" />
              <label htmlFor="email">Password</label>
              <div className='passwordField'>
              <input type={showPassword ? "text" : "password"} name="password" />
              { eyeIcon ? <FaRegEye onClick={switchPassword} className='passwordEyeIcon' /> : <FaRegEyeSlash onClick={switchPassword} className='passwordEyeIcon'/> }
              </div>
          </div>
          <div className='logSignBtnDiv'>
          <button className='btn-log'>Log in</button>
          <p>don't have an account yet, <a href=''>SignUp</a> </p> 
          </div>

        </div>
         
        </div>
         
    </div>
  )
}

export default Login;
