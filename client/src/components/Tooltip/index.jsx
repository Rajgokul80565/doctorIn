import React from 'react'
import "./tooltip.css";

function ToolTip(props) {
    let {text, children, show} = props;
  return (
    
    <div className="tooltip">
      {children}
      {!show && <span className="tooltiptext">{text}</span>}
    </div>
  )
}

export default ToolTip