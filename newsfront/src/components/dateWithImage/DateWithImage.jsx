import React from "react";
import "./dateWithImage.css";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

function DateWithImage({ 
  imageSrc, 
  altText, 
  eventName, 
  tagline, 
  startDate, 
  endDate, 
  location 
}) {
  // Smooth scroll handler
  const handleScroll = () => {
    const target = document.getElementById("contactForm");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="dateImageCard">
      <div className="dateImageCard__image">
        <img src={imageSrc} alt={altText} />
      </div>
      <div className="dateImageCard__content">
        <h2 className="dateImageCard__eventName">{eventName}</h2>
        <p className="dateImageCard__tagline">✨ {tagline}</p>
        
        <div className="dateImageCard__details">
          <p>
            <FaCalendarAlt className="icon" /> 
            <strong> Dates:</strong> {startDate} – {endDate}
          </p>
          <p>
            <FaMapMarkerAlt className="icon" /> 
            <strong> Location:</strong> {location}
          </p>
        </div>

        <button onClick={handleScroll} className="btn-slide">
          <p>Register Now</p> 
        </button>
      </div>
    </div>
  );
}

export default DateWithImage;