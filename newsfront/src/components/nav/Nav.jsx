import React, { useEffect, useState } from 'react'
import "./nav.css"
import logo from "../../assets/logo.png"
import menu from "../../assets/menu.png"
import { Link } from 'react-router'



const Nav = ({active}) => {
  const [fixed, setFixed] = useState(false);
  const [seeNav, setSeeNav] = useState(false)
   function dertermineFixed(){
    if(window.scrollY > 60){
      setFixed(true)
    }
    else{
      setFixed(false)
    }
   }

   useEffect(() => {
     window.addEventListener('scroll', dertermineFixed)
     return () => {
       window.removeEventListener('scroll', dertermineFixed)
     }
   }, [])
   
  
   
  return (
    <div className={`nav ${fixed ? "navFixed":""}`}>
      <Link to="/" className="logo">
       <img src={logo} alt="" />
      </Link>
           <ul className={`${seeNav?"active":""}`}>
      <Link onClick={()=>{setSeeNav(prev=>!prev)}} className={`${ active == "home" ? "active":""}`} to="/" ><span></span>Home</Link>
      <Link onClick={()=>{setSeeNav(prev=>!prev)}} className={`${ active == "about" ? "active":""}`} to="/about"><span></span>About Us</Link>
      <Link onClick={()=>{setSeeNav(prev=>!prev)}} className={`${ active == "service" ? "active":""}`} to="/services"><span></span>Services</Link>
      <Link onClick={()=>{setSeeNav(prev=>!prev)}} className={`${ active == "blog" ? "active":""}`} to={`/bloggrid/${1}`}><span></span>Blogs</Link>
      <Link onClick={()=>{setSeeNav(prev=>!prev)}} className={`${ active == "database" ? "active":""}`} to="/dataBase"><span></span>DataBase</Link>
</ul>
<img onClick={()=>{setSeeNav(prev=>!prev)}} className={`menu ${seeNav?"active":""}`}  src={menu} alt="" />
      
      <Link to="/contact" className={` ${active === "contact" ? "deactive" : "" } btn`}>
      <p>Contact Us</p></Link>
    </div>
  )
}

export default Nav
