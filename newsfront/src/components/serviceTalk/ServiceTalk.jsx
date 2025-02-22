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
  <p className='2 aniOnView' >
    At RCCG NewSpring Youth, our mission is to positively impact lives through faith-driven initiatives and compassionate service. We strive to bring hope to those in need, whether by providing essential support, organizing outreach programs, or addressing the unique needs of our community.
  </p>
  <p className=' aniOnView' >
    Through collective efforts, we aim to strengthen spiritual growth, encourage acts of kindness, and uplift individuals to create lasting change. Join us in making a difference as we work together to extend God’s love to every corner of our community.
  </p>
</div>
<div className="service_card_container">
  <div className="service_card aniOnView">
    <i className="fas fa-praying-hands"></i> {/* Worship Services Icon */}
    <h2>Worship Services</h2>
    <p>
      Be a part of our vibrant and uplifting worship services, where you can connect deeply with God and experience the joy of fellowship. From soul-stirring praise sessions to inspiring sermons, our gatherings are designed to nurture your spiritual growth and empower you for the week ahead.
    </p>
  </div>
  <div className="service_card aniOnView">
    <i className="fas fa-hands-helping"></i> {/* Community Contributions Icon */}
    <h2>Community Contributions</h2>
    <p>
      At RCCG NewSpring Youth, we actively contribute to our community by organizing outreach events, providing support for the less privileged, and creating opportunities to make a tangible difference. Together, we aim to reflect Christ’s love through our actions and partnerships.
    </p>
  </div>
  <div className="service_card aniOnView">
    <i className="fas fa-book"></i> {/* Education and Events Icon */}
    <h2>Education and Events</h2>
    <p>
      We believe in equipping individuals with knowledge and opportunities to grow. Our events include empowering seminars, engaging workshops, and educational initiatives aimed at fostering both spiritual and personal development for a better future for the church and as individuals.
    </p>
  </div>
  <div className="service_card aniOnView">
    <i className="fas fa-church"></i> {/* Church Building Icon */}
    <h2>Church Building</h2>
    <p>
      Our church building serves as a sanctuary of hope, prayer, and community. It is a space where everyone is welcome to gather, worship, and connect. We are constantly improving our facilities to better serve the needs of our congregation and support the work of the ministry.
    </p>
  </div>
</div>

        </div>
  <div className="serviceLink">
 
  <ul className="list-link aniOnView ">
  <h2>Ministries</h2>
  <li>Youth Worship Team</li>
  <li>Bible Study and Discipleship</li>
  <li>Evangelism and Outreach</li>
  <li>Community Service Projects</li>
  <li>Prayer and Intercession Team</li>
  <li>Media and Creative Arts</li>
  <li>Sports and Recreational Activities</li>
  <li>Drama and Dance Ministry</li>
  <li>Entrepreneurship and Skills Development</li>
  <li>Leadership and Mentorship Programs</li>
  <li>Teenage Counseling and Guidance</li>
  <li>Academic and Career Development</li>
</ul>
  <div   className="contact-link aniOnView">
    <h2>Reach Out Anytime – We’d Love to Hear from You!</h2>
    <Link to="/contact" className="btn">
      <p>Contact us</p>
    </Link>
  </div>

   <div className="socials-Link aniOnView">
            <h2>FOLLOW US ON</h2>
          <div className="socials">
          <Link target="_blank" to="https://www.facebook.com/RCCGNewSprings">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
          <Link target="_blank" to="https://www.instagram.com/rccgnewsprings/">
            <i class="fa-brands fa-instagram"></i>
          </Link>
          <Link target="_blank" to="https://www.youtube.com/@RCCGNewSprings">
            <i class="fa-brands fa-youtube"></i>
          </Link>
        </div>
          </div>
          <div className="serviceData">
          <h2>Service shedules</h2>
          <div className="service_details">
          <p><strong>Sunday First Service:</strong> 8:00 AM - 10:30 AM</p>
    <p><strong>Sunday Second Service:</strong> 10:30 AM - 1:00 PM</p>
    <p><strong>Tuesday Bible Study:</strong> 6:00 PM - 7:30 PM</p>
    <p><strong>Thursday Prayer Meeting:</strong> 6:00 PM - 7:30 PM</p>
    <p><strong>Monthly Night Vigil:</strong> Last Friday of the Month, 10:00 PM - 4:00 AM</p>
          </div>
          </div>
        </div>
    </div>
  )
}

export default ServiceTalk