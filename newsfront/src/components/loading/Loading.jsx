import React from "react";
import "./loading.css";
import logo from "../../assets/logo2.jpg";

const Loading = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <img src={logo} alt="Logo" className="loading-logo" />
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Loading;