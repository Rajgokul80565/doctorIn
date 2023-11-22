import React from 'react'
import Header from "./HOCs/Header"
import Home from "./screens/Home";
import Login from "./screens/LoginPage";
import './index.css';
import './App.css';
import RouterApp from './routes/index';


function App() {
  return (
    <>
      <RouterApp />
    </>
  )
}

export default App