import {useRef, useEffect} from "react";
import "./event.css";

import { Link } from "react-router";

const Event = ({events}) => {
  const observer = useRef(null)
  useEffect(() => {
    observer.current = new IntersectionObserver((entries)=>{
     entries.forEach((entry)=>{
       if(entry.isIntersecting){
        entry.target.classList.add("active")
        observer.current.unobserve(entry.target);
       }
       else{
        entry.target.classList.remove("active")
       }
     })
    }, {threshold: 0.3})
     const elements = document.querySelectorAll('.event_card');
     elements.forEach((el)=>observer.current.observe(el));
    return () => {
      if(observer.current){
          elements.forEach((el)=>observer.current.unobserve(el))
      }
    }
  }, [])


  return (
    <div className="event">
      <h2 className="title">Special Annual Event</h2>
      <div className="event_containier container_flex_between">
        {events.map((event, index) => (
          <div className={`${event.animationClass} event_card`} key={index}>
            <div className="event_image">
              <img src={event.image} alt={event.alt} />
            </div>

            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <Link to={event.link} className="btn-slide">
              <p>More Details</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;