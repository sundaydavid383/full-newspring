import {useRef, useEffect} from "react";
import "./event.css";
import prayer from "../../assets/rccg11.jpg";
import faith from "../../assets/rccg1.jpg";
import retreat from "../../assets/rccg12.jpg";
import { Link } from "react-router";

const Event = () => {
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
      <h2 className="title">Special Annual Event </h2>
      <div className="event_containier container_flex_between">
        <div className="event_ani1 event_card">
          <div className="event_image">
            <img src={prayer} alt="Prayer Meetings" />
          </div>

          <h3>Prayer and Worship Nights</h3>
          <p>
            A powerful gathering where youth come together to seek God through
            heartfelt prayers and uplifting worship. These nights are designed
            to refresh spirits, build a deeper connection with God, and
            strengthen communal bonds through shared faith.
          </p>
          <Link to="/worshipnight" className="btn-slide"><p>More Details</p></Link>
        </div>
        <div className="event_ani2 event_card">
          <div className="event_image">
            <img src={faith} alt="Bible Study" />
          </div>

          <h3>Bible Study Sessions</h3>
          <p>
            Dive into the Word of God with engaging and interactive Bible study
            sessions. These sessions help youth gain practical insights from
            Scripture, strengthen their understanding of God’s promises, and
            encourage them to apply biblical principles to each individuals everyday life.
          </p>
          <Link to="/biblestudy" className="btn-slide"><p>More Details</p></Link>
        </div>
        <div className="event_ani3 event_card">
          <div className="event_image">
            <img src={retreat} alt="Youth Retreats" />
          </div>

          <h3>Youth Retreats</h3>
          <p>
            A dedicated time away to recharge spiritually, emotionally, and
            mentally. These retreats provide an opportunity for deep worship,
            insightful teachings, group activities, and bonding moments that
            strengthen faith and friendships in a serene and inspiring
            environment.
          </p>
                    <div className="btn-slide"><p>More Details</p></div>
        </div>
      </div>
    </div>
  );
};

export default Event;
