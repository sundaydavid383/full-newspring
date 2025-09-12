import {useRef, useEffect} from 'react'
import "./serviceTalk.css"
import { Link } from 'react-router'
import img1 from "../../assets/rccg13.jpg"

const ServiceTalk = () => {
  const observer = useRef(false);

  useEffect(() => {
     
    observer.current = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add("active");
          observer.current.unobserve(entry.target)
        }
        else{
          entry.target.classList.remove("active")
        }
      })
    },{threshold: 0.2})

    const elements = document.querySelectorAll(".aniOnView")
    elements.forEach((el)=>observer.current.observe(el))

  
    return () => {
       elements.forEach((el)=>observer.current.unobserve(el))
    }
  }, [])
  
  
  return (
  <div className='serviceTalk container_flex_between'>
    <div className="serviceWord">
      <img className='serviceWordImage aniOnView' src={img1} alt="" />
      <div className="service_text_container">
        <h2>Mission and Aid Efforts</h2>
        <p className='aniOnView'>
          At TIM412, we strive to impact lives through faith-driven initiatives and compassionate service. We aim to bring hope, support those in need, and create meaningful opportunities for growth.
        </p>
        <p className='aniOnView'>
          By working together, we encourage spiritual growth, acts of kindness, and community transformation. Join us in extending God’s love to everyone around us.
        </p>
      </div>

      <div className="service_card_container">
        {[
          { icon: "fas fa-praying-hands", title: "Worship Services", text: "Join our vibrant worship sessions with uplifting music and inspiring sermons to grow in faith and fellowship." },
          { icon: "fas fa-hands-helping", title: "Community Contributions", text: "Participate in outreach events, support the less privileged, and help make a tangible difference in the community." },
          { icon: "fas fa-book", title: "Education and Events", text: "Attend seminars, workshops, and learning initiatives designed to promote spiritual and personal growth." },
          { icon: "fas fa-church", title: "Church Building", text: "Our church is a welcoming sanctuary for worship, prayer, and connection, constantly improved to serve our members and ministry." }
        ].map((card, i) => (
          <div key={i} className="service_card aniOnView">
            <i className={card.icon}></i>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="serviceLink">
      <ul className="list-link aniOnView">
        <h2>Ministries</h2>
        {[
          "Youth Worship Team", "Bible Study & Discipleship", "Evangelism & Outreach", 
          "Community Service Projects", "Prayer & Intercession", "Media & Creative Arts",
          "Sports & Recreation", "Drama & Dance Ministry", "Entrepreneurship & Skills Development",
          "Leadership & Mentorship", "Teen Counseling & Guidance", "Academic & Career Development"
        ].map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <div className="contact-link aniOnView">
        <h2>Reach Out Anytime – We’d Love to Hear from You!</h2>
        <Link to="/contact" className="btn"><p>Contact us</p></Link>
      </div>

      <div className="socials-Link aniOnView">
        <h2>FOLLOW US ON</h2>
        <div className="footer_socials">
          <Link target="_blank" to="https://www.facebook.com/RCCGNewSprings"><i className="fa-brands fa-facebook-f"></i></Link>
          <Link target="_blank" to="https://www.instagram.com/rccgnewsprings/"><i className="fa-brands fa-instagram"></i></Link>
          <Link target="_blank" to="https://www.youtube.com/@RCCGNewSprings"><i className="fa-brands fa-youtube"></i></Link>
        </div>
      </div>

      <div className="serviceData">
        <h2>Service Schedules</h2>
        <div className="service_details">
          {[
            ["Sunday First Service", "8:00 AM - 10:30 AM"],
            ["Sunday Second Service", "10:30 AM - 1:00 PM"],
            ["Tuesday Bible Study", "6:00 PM - 7:30 PM"],
            ["Throne Time", "6:00 PM - 7:30 PM"],
            ["Monthly Mini Vigil", "Last Friday, 7:00 PM - 10:00 pm"]
          ].map(([title, time], i) => (
            <p key={i}><strong>{title}:</strong> <span>{time}</span></p>
          ))}
        </div>
      </div>
    </div>
  </div>
)
}

export default ServiceTalk