import React from 'react'
import Header from "./HOCs/Header"
import Home from "./screens/Home";
import Login from "./screens/LoginPage";
import './index.css';
import './App.css';
import RouterApp from './routes/index';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <>
    <ToastContainer/>
      <RouterApp />
    </>
  )
}

export default App