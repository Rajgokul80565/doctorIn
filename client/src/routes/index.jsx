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


function RouterApp() {

    const routers = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Login/>} />
    ));
    
  return (
    <RouterProvider router={routers} />
  )
}

export default RouterApp;