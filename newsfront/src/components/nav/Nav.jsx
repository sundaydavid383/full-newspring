import React, { useEffect, useState } from 'react';
import "./nav.css";
import logo from "../../assets/logo2.jpg";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom'; // should be 'react-router-dom'

const Nav = ({ active }) => {
  const [fixed, setFixed] = useState(false);
  const [seeNav, setSeeNav] = useState(false);
  const [user, setUser] = useState(null);
  const [seeUserDetails, setSeeUserDetails] = useState(false);

  // Fix nav on scroll
  useEffect(() => {
    function determineFixed() {
      setFixed(window.scrollY > 60);
    }
    window.addEventListener('scroll', determineFixed);
    return () => {
      window.removeEventListener('scroll', determineFixed);
    };
  }, []);

  // Load user from localStorage once
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className={`nav ${fixed ? "navFixed" : ""}`}>
      {/* Logo */}
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>

      {/* Hamburger */}
      <div className="menu-icon" onClick={() => setSeeNav(prev => !prev)}>
        {seeNav ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Nav Links */}
      <ul className={`${seeNav ? "active" : ""}`}>
        <li>
          <Link onClick={() => setSeeNav(false)} className={active === "home" ? "active" : ""} to="/">Home</Link>
        </li>
        <li>
          <Link onClick={() => setSeeNav(false)} className={active === "about" ? "active" : ""} to="/about">About Us</Link>
        </li>
        <li>
          <Link onClick={() => setSeeNav(false)} className={active === "service" ? "active" : ""} to="/services">Services</Link>
        </li>
        <li>
          <Link onClick={() => setSeeNav(false)} className={active === "blog" ? "active" : ""} to={`/bloggrid/1`}>Blogs</Link>
        </li>
        <li>
          <Link onClick={() => setSeeNav(false)} className={active === "database" ? "active" : ""} to="/dataBase">DataBase</Link>
        </li>
        {user && (
          <li>
            <Link onClick={() => setSeeNav(false)} className={active === "contact" ? "active" : ""} to="/contact">Contact</Link>
          </li>
        )}
        <li>
          <Link onClick={() => setSeeNav(false)} className={`${active === "contact" ? "active" : ""} nav-contact-link`} to="/contact">
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Right-side: User or Contact */}
      {user ? (
        <div className="user-icon">
          <FaUser onClick={() => setSeeUserDetails(prev => !prev)} />
          {seeUserDetails && (
  <ul className="user-details-dropdown">
    <li><strong>Name:</strong> {user.firstname} {user.lastname}</li>
    <li><strong>Email:</strong> {user.email}</li>
    {user.phone && <li><strong>Phone:</strong> {user.phone}</li>}
    {user.age && <li><strong>Age:</strong> {user.age}</li>}
    {user.school && <li><strong>School:</strong> {user.school}</li>}
    {user.occupation && <li><strong>Occupation:</strong> {user.occupation}</li>}
    {user.hobbies && <li><strong>Hobbies:</strong> {user.hobbies}</li>}
    {user.heardAboutUs && <li><strong>Heard About Us:</strong> {user.heardAboutUs}</li>}
    {user.interest && <li><strong>Interest:</strong> {user.interest}</li>}
    {user.department && <li><strong>Department:</strong> {user.department}</li>}
    {user.education && <li><strong>Education:</strong> {user.education}</li>}
    {user.image && (
      <li>
        <strong>Image:</strong><br />
        <img src={user.image} alt="Profile" className="profile-image" />
      </li>
    )}
  </ul>
)}
        </div>
      ) : (
        <Link to="/contact" className={`btn desktop-contact ${active === "contact" ? "deactive" : ""}`}>
          <p>Contact Us</p>
        </Link>
      )}
    </div>
  );
};

export default Nav;