import React from 'react'
import "./inputags.css";

function InputTags({text, onClick, key}) {
  return (
    <span key={key} id="tags_container" onClick={onClick}>
        <span id="tags_text">{text} &times;</span>
    </span>
  )
}

export default InputTags