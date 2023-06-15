import React from 'react'


function Home() {
  return (
    <div style={{
        height: "100vh", 
        display: "flex", 
        justifyContent: "center",
        paddingTop:"200px"
        }}>
        <div>
        <div>
            <h2>Hi there!</h2>
            <h4>Welcome to Jwt. Json web token</h4>
        </div>
        <div>
        <button>Sign in</button>
        <button>Sign up</button>
        </div>
        </div>
    </div>
  )
}

export default Home