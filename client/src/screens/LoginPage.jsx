import React, {useState, useEffect} from 'react';
import "../App.css";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { routes } from "../routes/routes";
import { useLoginMutation } from "../redux/slices/userSlice";
import { useDispatch, useSelector} from "react-redux";
import { setCrenditails, clearCreditails } from '../redux/slices/authslice';
import { toast } from 'react-toastify';
import LogosSlider from '../components/LogoSlider';



function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

 const {userInfo} = useSelector((state) => state.auth);

useEffect(()=> {
  dispatch(clearCreditails());
},[])


  let switchPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login({email: email, password: password}).unwrap();
      console.log("resLogin", res);
      dispatch(setCrenditails({...res}));
      if(res?.roleType == 1){
        navigate(routes.doctorHome);
      }else{
        navigate(routes.userHome);
      }   
    } catch (err) {
      console.log( "error",err.data.message);
      toast.error(err.data.message || err.message);
    }
  }

  return (
    <div id='logMainLayer'>
        <div id='logLeft'>
          {/* <img className='loginLeftImg' src={LoginImg} alt="login image" /> */}
          <h4>our <span>happy</span> clients</h4> 
          <LogosSlider/>
        </div>
        <div id='logRight'>
        <div className='logSignCard'>
          <div className='logSignFirstCard'>
          <h2 className='welcomeText'>Welcome back!</h2>
          <h6 className='secondaryWelcome'>please enter your details</h6>
          </div>
          <div className='logSignFormDiv'>
              <label htmlFor="email">Email</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
              <label htmlFor="email">Password</label>
              <div className='passwordField'>
              <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password" />
              { eyeIcon ? <FaRegEye onClick={switchPassword} className='passwordEyeIcon' /> : <FaRegEyeSlash onClick={switchPassword} className='passwordEyeIcon'/> }
              </div>
          </div>
          <div className='logSignBtnDiv'>
          <button className='btn-log' onClick={onSubmit}>Log in</button>
          <p>don't have an account yet, <Link to={routes.signup}> <a href=''>SignUp</a></Link> </p> 
          </div>
        </div>
        </div>
    </div>
  )
}

export default Login;
