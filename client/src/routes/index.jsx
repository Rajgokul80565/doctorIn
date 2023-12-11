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
    Admindashboard,
    UserDashboard,
    ProfileScreen
} from "../screens";
import Navbar from "../components/Navbar"
import {routes} from "./routes";
import PrivateRoute from "./privateRoute";


function RouterApp() {

    const routers = createBrowserRouter(createRoutesFromElements(
      <Route element={<Navbar/>}>
        <Route path={routes.login} element={<Login/>} />
        <Route path={routes.signup} element={<SignUp/>} />
        <Route path="" element={<PrivateRoute/>}>
        <Route path={routes.doctorHome} element={<Admindashboard/>} />
        </Route>
        <Route path="" element={<PrivateRoute/>}>
        <Route path={routes.userHome} element={<UserDashboard/>} />
        </Route>
      </Route>
    ));
    
  return (
    <RouterProvider router={routers} />
  )
}

export default RouterApp;