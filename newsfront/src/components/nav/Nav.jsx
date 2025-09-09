import React, { useEffect, useState } from 'react';
import "./nav.css";
import logo from "../../assets/logo2.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router';

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
      {/* Logo on the LEFT */}
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>

      {/* Hamburger on the RIGHT */}
     <div className="menu-icon" onClick={() => setSeeNav(prev => !prev)}>
        {seeNav ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Nav Links */}
      <ul className={`${seeNav ? "active" : ""}`}>
        <li>
          <Link onClick={() => setSeeNav(false)} className={`${active === "home" ? "active" : ""}`} to="/">
            <span></span>Home
          </Link>
        </li>
        <li>
          <Link onClick={() => setSeeNav(false)} className={`${active === "about" ? "active" : ""}`} to="/about">
            <span></span>About Us
          </Link>
        </li>
        <li>
          <Link onClick={() => setSeeNav(false)} className={`${active === "service" ? "active" : ""}`} to="/services">
            <span></span>Services
          </Link>
        </li>
        <li>
          <Link onClick={() => setSeeNav(false)} className={`${active === "blog" ? "active" : ""}`} to={`/bloggrid/1`}>
            <span></span>Blogs
          </Link>
        </li>
        <li>
          <Link onClick={() => setSeeNav(false)} className={`${active === "database" ? "active" : ""}`} to="/dataBase">
            <span></span>DataBase
          </Link>
        </li>
        {/* Contact link (mobile only, styled differently) */}
        <li>
          <Link
            onClick={() => setSeeNav(false)}
            className={`${active === "contact" ? "active" : ""} nav-contact-link`}
            to="/contact"
          >
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Desktop Contact button */}
      <Link to="/contact" className={`btn desktop-contact ${active === "contact" ? "deactive" : ""}`}>
        <p>Contact Us</p>
      </Link>
    </div>
  );
};

export default Nav;