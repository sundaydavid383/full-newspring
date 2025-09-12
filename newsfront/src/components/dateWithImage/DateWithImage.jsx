import React, { useEffect, useState } from "react";
import "./dateWithImage.css";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function DateWithImage({ 
  imageSrc, 
  altText, 
  eventName, 
  tagline, 
  startDate, 
  endDate, 
  location 
}) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Easter Friday 2025 → April 18, 2025
  const targetDate = new Date("2025-04-18T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
        setTimeLeft(null); // Countdown finished
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

        {/* Countdown Section */}
        {timeLeft ? (
          <div className="countdown">
            <h3>⏳ Countdown to Easter Friday</h3>
            <p>
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
          </div>
        ) : (
          <p className="countdown-ended">✨ Easter Friday is here!</p>
        )}

        <button onClick={handleScroll} className="btn-slide">
          <p>Register Now</p> 
        </button>
      </div>
    </div>
  );
}

export default DateWithImage;