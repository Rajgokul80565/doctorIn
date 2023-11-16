import React from 'react';
import "../App.css";

function Home() {
  return (
    <div id='logMainLayer'>
        <div id='logLeft'>
          Illustration comes here
        </div>
        <div id='logRight'>
        <div className='logSignCard'>
          <div className='logSignFirstCard'>
          <h2 className='welcomeText'>Welcome back!</h2>
          <h6 className='secondaryWelcome'>please enter your details</h6>
          </div>
          <div className='logSignFormDiv'>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" />
              <label htmlFor="email">Password</label>
              <input type="password" name="password" />
          </div>
          <div className='logSignBtnDiv'>
          <button className='btn-log'>Log in</button>
          <p>don't have an account yet <a>Sign in</a></p>
          </div>

        </div>
         
        </div>
         
    </div>
  )
}

export default Home


 {/* <div style={{
             width: "50px",
            height: "50px",  
            position:"absolute",
            top:"-30px",
            left:"-10px",  
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "1.25rem",
            backgroundColor:"yellow",
          }}>
            1
          </div> */}
        {/* <div style={{width:"400px" ,height: "400px"}}>
        <div>
            <h2 style={{marginBottom:"10px"}}>Hi there</h2>
            <h5 style={{color:"#8e8a8a"}}>Welcome to Jwt. Json web token project</h5>
        </div>
        <div style={{display: "flex", justifyContent: "space-around", marginTop: "30px"}}>
        <button style={{textDecoration:"none", border: "none", width:"85px", height:"36px", borderRadius: "10px", cursor:"pointer"}}>Sign in</button>
        <button style={{textDecoration:"none", border: "none", width:"85px", height:"36px", borderRadius: "10px", backgroundColor:"#00FFD1", cursor:"pointer"}}>Register</button>
        </div>
        </div> */}