import React, {useState,useEffect, useRef} from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io"
import { RiArrowDropDownLine } from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux';
import {useLogoutMutation} from "../redux/slices/userSlice";
import {routes} from "../routes/routes";
import {clearCreditails} from "../redux/slices/authslice"
import { LiaUserEditSolid } from "react-icons/lia";
import {useClickOutside} from "../hooks"

function Navbar() {

  const [userDetail, setUserDetail] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate =useNavigate();
  let menuRef = useRef("menu")

      let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    
      useClickOutside(menuRef,()=>{
        setDropDown(!dropDown);
      })

    console.log("dropDownWorking", dropDown, userDetail);

    const logOutHandler = async() => {
      console.log("logOutHandlerclicking..")
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

    const onEditBtn = () => {
      setDropDown(false);
      navigate(routes.profile);
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
        <RiArrowDropDownLine ref={menuRef} />
        </>
        )}
        {(userInfo?.name) &&  
        <div ref={menuRef} className={`dropdown-menu ${dropDown ? "active" : "inactive"}`} >
          <ul>
          <DropdownItem onClick={onEditBtn} icon={LiaUserEditSolid} text={"Edit Profile"}/>
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
    <li onClick={props?.onClick} className="dropdownItem">
        <Icon className="dropdown-icon"/>
        <a>{props?.text}</a>
    </li>
  )
}


export default Navbar;