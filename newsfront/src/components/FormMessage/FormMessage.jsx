// components/FormMessage.jsx
import React from "react";
import "./formMessage.css";

const FormMessage = ({ type, message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`form-message ${type}`}>
      <p>{message}</p>
      {onClose && (
        <div onClick={onClose} className="btn small-btn">
          <p>Got it</p>
        </div>
      )}
    </div>
  );
};

export default FormMessage;