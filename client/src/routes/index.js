import React from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements, 
    Route
} from "react-router-dom";


import {
    Login,
    SignUp,
    Home,
} from "../screens";




function RouterApp() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Login />} />
    ))
    
  return (
    <div>index</div>
  )
}

export default index