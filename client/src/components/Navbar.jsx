import React, {useState,useEffect} from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux';
import {useLogoutMutation} from "../redux/slices/userSlice";
import {routes} from "../routes/routes";
import {clearCreditails} from "../redux/slices/authslice"


function Navbar() {

  const [userDetail, setUserDetail] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [logout, {isLoading}] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate =useNavigate();

    useEffect(() => {
      let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
      setUserDetail({...userInfo});
    },[])

    console.log("dropDown", dropDown);

    const logOutHandler = async() => {
      try {
        let logOutUser =  await logout().unwrap();
        dispatch(clearCreditails());
        navigate(routes.login);
      } catch (error) {
        console.log("err", error.message);
      }
     
    }

  return (
    <>
        <div  id='navbar' >
        <div id="brandlogo">
        Jwt.
        </div>
        <div id='navbarProfileDiv'>
        {userDetail?.name && <CgProfile id='navbarProfile'  />}
        {userDetail?.name && <h5 id='navbarProfileName'>{userDetail?.name}</h5>}
        {userDetail?.name && <RiArrowDropDownLine onClick={() => setDropDown(!dropDown)}/>}
        {(userDetail?.name && dropDown) &&  <div className="dropdown-content">
      <a onClick={logOutHandler}>Logout</a>
    
    </div>}
        </div>
        </div>
        <Outlet/>
    </>
  )
}

export default Navbar;