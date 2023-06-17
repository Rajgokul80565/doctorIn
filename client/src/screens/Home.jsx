import React from 'react';
import "../App.css";

function Home() {
  return (
    <div style={{
        height: "100vh", 
        display: "flex", 
        justifyContent: "center",
        paddingTop:"150px"
        }}>
        <div style={{width:"300px" ,height: "300px"}}>
        <div>
            <h2 style={{marginBottom:"10px"}}>Hi there!</h2>
            <h5 style={{color:"#8e8a8a"}}>Welcome to Jwt. Json web token project</h5>
        </div>
        <div style={{display: "flex", justifyContent: "space-around", marginTop: "30px"}}>
        <button style={{textDecoration:"none", border: "none", width:"85px", height:"36px", borderRadius: "10px", cursor:"pointer"}}>Sign in</button>
        <button style={{textDecoration:"none", border: "none", width:"85px", height:"36px", borderRadius: "10px", backgroundColor:"#00FFD1", cursor:"pointer"}}>Register</button>
        </div>
        </div>
    </div>
  )
}

export default Home