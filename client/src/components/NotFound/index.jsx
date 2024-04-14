import React from 'react'
import "./notfound.css";
import notFoundImg from "../../assets/images/not_found.png";


function NotFound() {
  return (
    <div id="notfound_main">
        <img src={notFoundImg} alt="not-found-img" />
    </div>
  )
}

export default NotFound;