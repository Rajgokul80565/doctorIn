import React from 'react'

const withHeader = (Component) => (props) => {
  return (
    <>
  <div  className="brandlogo" >Jwt.</div>
  <Component {...props} />
    </>
   
  )
  };

export default withHeader;