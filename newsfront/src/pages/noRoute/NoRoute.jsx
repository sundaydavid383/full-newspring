import React from 'react'
import "./NoRoute.css"
import image from "../../assets/noFound.svg"
import { Link } from 'react-router'

const NoRoute = () => {
  return (
    <div className='noroute container_flex_around'>
        <img src={image} alt="" />
   
      <div className="text">
        <h1>404</h1>
        <div>
            <p>
            Oops! Sorry, this page does not exist. 
            </p>
  <p>Return to <Link to={"/"}>Home</Link>.</p>
</div>
      </div>
     
    </div>
  )
}

export default NoRoute