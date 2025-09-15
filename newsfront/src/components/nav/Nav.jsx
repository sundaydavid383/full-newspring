import React, { useEffect, useState, useContext } from "react";
import "./nav.css";
import logo from "../../assets/logo2.jpg";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Nav = ({ active }) => {
  const [fixed, setFixed] = useState(false);
  const [seeNav, setSeeNav] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [seeUserDetails, setSeeUserDetails] = useState(false);
  const navigate = useNavigate();

  // Fix nav on scroll
  useEffect(() => {
    const handleScroll = () => setFixed(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user from localStorage once
  useEffect(() => {
    const storedUser = localStorage.getItem("TIM412user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user:", err);
        localStorage.removeItem("TIM412user");
        setUser(null);
      }
    }
  }, [setUser]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("TIM412user");
    setUser(null);
    navigate("/"); // redirect to homepage
  };

  return (
    <div className={`nav ${fixed ? "navFixed" : ""}`}>
      {/* Logo */}
      <Link to="/" className="logo" onClick={() => setSeeNav(false)}>
        <img src={logo} alt="Logo" />
      </Link>

      {/* Hamburger menu */}
      <div className="menu-icon" onClick={() => setSeeNav((prev) => !prev)}>
        {seeNav ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Nav Links */}
      <ul className={`${seeNav ? "active" : ""}`}>
  {[
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "services", path: "/services" },
    { name: "blog", path: "/bloggrid/0" }, // default category index 0
    // { name: "worship night", path: "/worshipnight" },
    // { name: "bible study", path: "/biblestudy" },
    // { name: "retreat", path: "/retreat" },
    { name: "contact", path: "/contact" }
  ].map((item) => (
    <li key={item.name}>
      <Link
        onClick={() => setSeeNav(false)}
        className={active === item.name ? "active" : ""}
        to={item.path}
      >
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        <span></span>
      </Link>
    </li>
  ))}
</ul>

      {/* User / Contact logic */}
      {user ? (
        <div className="user-icon">
          <FaUser onClick={() => setSeeUserDetails((prev) => !prev)} />
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
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.4rem 0.8rem",
                    background: "var(--gold)",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <Link
          to="/contact"
          className={`btn desktop-contact ${active === "contact" ? "deactive" : ""}`}
        >
          <p>Contact Us</p>
        </Link>
      )}
    </div>
  );
};

export default Nav;