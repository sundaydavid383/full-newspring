import React, { useEffect, useState, useContext, useRef } from "react";
import "./nav.css";
import logo from "../../assets/logo2.jpg";
import { FaBars, FaTimes, FaUser} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Nav = ({ active }) => {
  const [fixed, setFixed] = useState(false);
  const [seeNav, setSeeNav] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [seeUserDetails, setSeeUserDetails] = useState(false);
  const navigate = useNavigate();

  const userDropdownRef = useRef(null);
  const userIconRef = useRef(null);

  // Fix nav on scroll
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userIconRef.current && !userIconRef.current.contains(e.target)){
        setSeeUserDetails(false)
      }
    };



    document.addEventListener('mousedown', handleClickOutside);
    const handleScroll = () => setFixed(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    }
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

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        seeUserDetails &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(e.target)
      ) {
        setSeeUserDetails(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setSeeUserDetails(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [seeUserDetails]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("TIM412user");
    localStorage.removeItem("TIM412token");
    setUser(null);
    // navigate to homepage and reload to clear state fully
    navigate("/");
    window.location.reload();
  };

        const capitalize = (str) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());


  return (
    <div className={`nav ${fixed ? "navFixed" : ""}`}>
      {/* Logo */}
      <Link to="/" className="logo" onClick={() => setSeeNav(false)}>
        <img src={logo} alt="Logo" />
      </Link>

      {/* Hamburger menu */}
      <div className="menu-icon" onClick={() => setSeeNav((p) => !p)}>
        {seeNav ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Nav Links */}
      <ul className={`${seeNav ? "active" : ""}`}>
        {[
          { name: "home", path: "/" },
          { name: "about", path: "/about" },
          { name: "services", path: "/services" },
          { name: "blog", path: "/bloggrid/0" },
          { name: "contact", path: "/contact" },
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
  <div
    className="user-icon"
    ref={userIconRef}
    aria-haspopup="true"
    aria-expanded={seeUserDetails}
  >
    {/* User Icon Button */}
    <button
      className="user-icon-button"
      onClick={() => setSeeUserDetails((p) => !p)}
      aria-label="User menu"
      title={`${user.firstname || "User"} menu`}
    >
      {user.image ? (
        <img
          src={user.image}
          alt="User Avatar"
          className="user-avatar"
        />
      ) : (
        <div className="avatar-initials">
          {`${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`.toUpperCase()}
        </div>
      )}
    </button>

    {/* Close Icon (Visible at top-right when open) */}
 

    {/* User Panel */}
    <div className={`user-panel ${seeUserDetails ? "show" : ""}`}>
         {seeUserDetails && (
      <FaTimes
        size={20}
        className="close-icon"
        title="Close Panel"
        onClick={() => setSeeUserDetails(false)}
      />
    )}
      <div className="user-header">
        {user.image ? (
          <img className="avatar" src={user.image} alt="User Avatar" />
        ) : (
          <div className="avatar-circle">
            {`${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`.toUpperCase()}
          </div>
        )}
        <div className="user-info">
          <h3>{`${capitalize(user.firstname) || ""} ${capitalize(user.lastname) || ""}`.trim()}</h3>
          <p>{user.email}</p>
          <p className="status">
            <span className={user.isVerified ? "verified" : "not-verified"}>
              {user.isVerified ? "Verified Member" : "Not Verified"}
            </span>
          </p>
        </div>
      </div>

      {!user.isVerified && (
        <div className="verify-warning">
          <strong>⚠️ Your account isn’t verified.</strong>
          <br />
          Please check your email or contact support to complete your verification.
        </div>
      )}

      <div className="user-details">
        {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        {user.age && <p><strong>Age:</strong> {user.age}</p>}
        {user.school && <p><strong>School:</strong> {user.school}</p>}
        {user.occupation && <p><strong>Occupation:</strong> {user.occupation}</p>}
        {user.hobbies && <p><strong>Hobbies:</strong> {user.hobbies}</p>}
        {user.heardAboutUs && <p><strong>Heard About Us:</strong> {user.heardAboutUs}</p>}
        {user.interest && <p><strong>Interest:</strong> {user.interest}</p>}
        {user.otpLastSentAt && (
          <p>
            <strong>OTP Last Sent:</strong>{" "}
            {new Date(user.otpLastSentAt).toLocaleString()}
          </p>
        )}
      </div>

      <div className="user-actions">
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={() => navigate("/settings")}>Settings</button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
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
