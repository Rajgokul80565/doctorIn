import React from 'react'
import { Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
        <div  className="brandlogo" >Jwt.</div>
        <Outlet/>
    </>
  )
}

export default Navbar;