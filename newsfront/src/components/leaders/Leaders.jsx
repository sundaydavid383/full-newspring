import React, { useEffect } from "react";
import "./leaders.css";

import { Link } from "react-router";
import { useRef } from "react";

const Leaders = ({leadersTitle, leadersTitleSmall, leaders}) => {

  const observer = useRef(null);
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.current.unobserve(entry.target);
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll(".leader_card");
    elements.forEach((em) => observer.current.observe(em));
    return () => {
      if (observer.current) {
        elements.forEach((em) => observer.current.observe(em));
      }
    };
  }, []);

  return (
    <div className="leaders">
      <h2 className="title">{leadersTitle}</h2>
      <p className="title_small">
       {leadersTitleSmall}
      </p>

      <div className="leaders_container">
        {leaders.map((leader, index) => (
          <div key={index} className={`leader_card lead${index}`}>
            <div className="leader_details">
              <div className="image">
                <img src={leader.image} alt="" />
                <div className="socials">
                  <Link target="_blank" to={leader.socials.facebook}>
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                  <Link target="_blank" to={leader.socials.instagram}>
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link target="_blank" to={leader.socials.twitter}>
                    <i className="fa-brands fa-x-twitter"></i>
                  </Link>
                </div>
              </div>
              <div className="leader_details_bottom">
                <i className={leader.posIcon}></i>
                <div className="name">
                  <p>{leader.name}</p>
                  <span>{leader.position}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaders;
