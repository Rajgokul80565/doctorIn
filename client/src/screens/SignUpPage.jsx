import React, {useState} from 'react';
import "../App.css";
// import { ReactComponent as LoginImg } from "../../public/images/login_img.svg"
import SignupImg from "../assets/images/signUp2.svg"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {routes} from "../routes/routes";
import { useDispatch, useSelector} from "react-redux";
import {useRegisterMutation} from "../redux/slices/userSlice";
import {setCrenditails} from "../redux/slices/authslice"
import { toast } from 'react-toastify';
import {validateEmail} from "../utils/"

function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [register, {isLoading, error}] = useRegisterMutation();
  const navigate = useNavigate();

  let switchPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  }

  const onSubmitRegister = async(e) => {
    console.log("emailSign", email, typeof email);
    e.preventDefault();
    if(validateEmail(email)) {
      try {
        let res = await register({name:name, email:email, password:password}).unwrap();
        dispatch(setCrenditails({...res}));
        navigate(routes.home);
        nav
      } catch (error) {
        console.log("err", error.message);
        toast.error(error.data.message || error.message);
      }
    }else{
      toast.error("Invalid email!");
    }
   

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
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" />
              <label htmlFor="email">Email</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
              <label htmlFor="email">Password</label>
              <div className='passwordField'>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
              { eyeIcon ? <FaRegEye onClick={switchPassword} className='passwordEyeIcon' /> : <FaRegEyeSlash onClick={switchPassword} className='passwordEyeIcon'/> }
              </div>
          </div>
          <div className='signBtnDiv'>
          <button onClick={onSubmitRegister} className='btn-log'>Sign up</button>
          <p>already have an account, <Link to={routes.login}><a href=''>Login</a> </Link></p> 
          </div>
        </div>
        </div>
         
    </div>
  )
}

export default SignUp;
