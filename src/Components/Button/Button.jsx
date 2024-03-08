import React from 'react'
import "./styleBtn.css"
import {Link} from "react-router-dom"

export const Button = (props) => {
  return (
    <div>
      <Link to={props.path}>
        <button className='btn' onClick={props.onClick}>{props.name}</button>
      </Link>
    </div>
  )
}