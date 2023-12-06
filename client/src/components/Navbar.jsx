import React, {useState,useEffect} from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io"
import { RiArrowDropDownLine } from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux';
import {useLogoutMutation} from "../redux/slices/userSlice";
import {routes} from "../routes/routes";
import {clearCreditails} from "../redux/slices/authslice"
import { LiaUserEditSolid } from "react-icons/lia";

function Navbar() {

  const [userDetail, setUserDetail] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate =useNavigate();

      let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    


    console.log("dropDown", dropDown, userDetail);

    const logOutHandler = async() => {
      try {
        let logOutUser =  await logout().unwrap();
        userInfo= {};
        setUserDetail({});
        dispatch(clearCreditails());
        setDropDown(false);
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
        {userInfo?.name && (
        <>
        <CgProfile id='navbarProfile'  />
        <h5 id='navbarProfileName'>{userInfo?.name}</h5>
        <RiArrowDropDownLine onClick={() => setDropDown(!dropDown)}/>
        </>
        )}
        {(userInfo?.name && true) &&  
        <div className="dropdown-menu" >
          <ul>
          <DropdownItem onClick={()=> navigate(routes.profile)} icon={LiaUserEditSolid} text={"Edit Profile"}/>
            <DropdownItem onClick={logOutHandler} icon={IoIosLogOut} text={"Logout"}/>
          </ul>
    
        </div>
    }
        </div>
        </div>
        <Outlet/>
    </>
  )
};



function DropdownItem(props) {
  const Icon = props?.icon;
  return (
    <li className="dropdownItem">
        <Icon className="dropdown-icon"/>
        <a>{props?.text}</a>
    </li>
  )
}


export default Navbar;