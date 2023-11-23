import React from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements, 
    Route,
    RouterProvider
} from "react-router-dom";
import {
    Login,
    SignUp,
    Home,
} from "../screens";
import Navbar from "../components/Navbar"


function RouterApp() {

    const routers = createBrowserRouter(createRoutesFromElements(
      <Route element={<Navbar/>}>
        <Route path='/' element={<Login/>} />
      </Route>
    ));
    
  return (
    <RouterProvider router={routers} />
  )
}

export default RouterApp;