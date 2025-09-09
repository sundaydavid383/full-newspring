import { useRef, useEffect, useState } from "react";
import "./upcommingevent.css";
import { Link } from "react-router";


const Upcommingevent = ({eventData}) => {
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
    const element = document.querySelector(".upcommingevent_container");
    observer.current.observe(element);
    return () => {
      if (observer.current) {
        observer.current.unobserve(element);
      }
    };
  }, []);
 

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

useEffect(() => {
  console.log(`when function started",${time} and ${eventData.datelogic}`)
  if (!eventData || !eventData.datelogic) {
    console.log("there is no eventdata for date logic")
    return
  };

  const targetDate = new Date(eventData.datelogic);
  const interval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      clearInterval(interval);
      return;
    }
    console.log(`when function is ongoing",${time} and ${eventData.datelogic}`)
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTime({ days, hours, minutes, seconds });
  }, 1000);
  console.log("when function end",time)

  return () => clearInterval(interval);
}, []);

  return (
    <div className="upcommingevent">
  <h2 className="title">Our Upcoming Events</h2>
<p className="title_small">{eventData.description}</p>
<div className="upcommingevent_container">
  <div className="upcomming_image">
    <img src={eventData.image} alt="" />
  </div>
  <div className="upcomming_details">
    <h3>{eventData.title}</h3>
    <p>
      <i className="fa-solid fa-calendar-days"></i> {eventData.dateTime}
    </p>
    <p>
      <i className="fa-solid fa-location-dot"></i> {eventData.location}
    </p>
    <div className="countdown">
      <div className="div"><p>Day</p><span>{String(time.days).padStart(2, "0")}</span></div>
      <div className="div"><p>Hours</p><span>{String(time.hours).padStart(2, "0")}</span></div>
      <div className="div"><p>Minutes</p><span>{String(time.minutes).padStart(2, "0")}</span></div>
      <div className="div"><p>Seconds</p><span>{String(time.seconds).padStart(2, "0")}</span></div>
    </div>
    <Link to="/contact" className="btn">
      <p>Contact Us</p>
    </Link>
  </div>
</div>
    </div>
  );
};

export default Upcommingevent;
