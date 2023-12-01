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
import {routes} from "./routes";


function RouterApp() {

    const routers = createBrowserRouter(createRoutesFromElements(
      <Route element={<Navbar/>}>
        <Route path={routes.login} element={<Login/>} />
        <Route path={routes.signup} element={<SignUp/>} />
        <Route path={routes.home} element={<Home/>} />
      </Route>
    ));
    
  return (
    <RouterProvider router={routers} />
  )
}

export default RouterApp;