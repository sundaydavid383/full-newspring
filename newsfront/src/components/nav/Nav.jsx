import React, { useEffect, useState } from 'react'
import "./nav.css"
import logo from "../../assets/logo.png"
import menu from "../../assets/menu.png"
import { Link } from 'react-router'

const Nav = ({ active }) => {
  const [fixed, setFixed] = useState(false);
  const [seeNav, setSeeNav] = useState(false);

  function determineFixed() {
    if (window.scrollY > 60) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', determineFixed);
    return () => {
      window.removeEventListener('scroll', determineFixed);
    };
  }, []);

  return (
    <div className={`nav ${fixed ? "navFixed" : ""}`}>
      
      {/* Hamburger on the LEFT */}
      <img
        onClick={() => setSeeNav(prev => !prev)}
        className={`menu ${seeNav ? "active" : ""}`}
        src={menu}
        alt="menu"
      />

      {/* Logo on the RIGHT */}
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>

      {/* Nav Links */}
      <ul className={`${seeNav ? "active" : ""}`}>
        <Link
          onClick={() => setSeeNav(false)}
          className={`${active === "home" ? "active" : ""}`}
          to="/"
        ><span></span>Home</Link>

        <Link
          onClick={() => setSeeNav(false)}
          className={`${active === "about" ? "active" : ""}`}
          to="/about"
        ><span></span>About Us</Link>

        <Link
          onClick={() => setSeeNav(false)}
          className={`${active === "service" ? "active" : ""}`}
          to="/services"
        ><span></span>Services</Link>

        <Link
          onClick={() => setSeeNav(false)}
          className={`${active === "blog" ? "active" : ""}`}
          to={`/bloggrid/1`}
        ><span></span>Blogs</Link>

        <Link
          onClick={() => setSeeNav(false)}
          className={`${active === "database" ? "active" : ""}`}
          to="/dataBase"
        ><span></span>DataBase</Link>

        {/* Contact inside the mobile nav */}
        <Link
          onClick={() => setSeeNav(false)}
          className={`${active === "contact" ? "active" : ""} contact-link`}
          to="/contact"
        >
          Contact Us
        </Link>
      </ul>

      {/* Contact button (desktop only) */}
      <Link to="/contact" className={`btn desktop-contact ${active === "contact" ? "deactive" : ""}`}>
        <p>Contact Us</p>
      </Link>
    </div>
  );
};

export default Nav;