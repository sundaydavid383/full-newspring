import React, { useEffect } from 'react'
import "./service.css"

import Hero from '../../components/hero/Hero'
import ServiceTalk from '../../components/serviceTalk/serviceTalk'

const Service = ({setActive}) => {
  useEffect(() => {
    setActive("service")
  }, [])
  
 
  const sectionType = "contact"
  const sections = [
    {
      id: 13,
      title: "Welcome to Our Services",
      paragraphs: [
        "Experience uplifting worship, inspiring messages, and a warm, welcoming community at RCCG NewSpring Youth. Our services are designed to help you grow spiritually and connect with others in faith.",
        "Whether you're new to church or looking for a vibrant community to call home, our doors are open to everyone.",
        "Join us this week to experience God’s presence and discover the joy of fellowship."
      ],
    },
    {
      id: 14,
      title: "Service Times",
      paragraphs: [
        "We offer multiple service times to fit your schedule:",
        "- Sunday Morning Service: 8:00 AM - 10:30 AM",
        "- Youth Fellowship Service: 11:00 AM - 1:00 PM",
        "- Midweek Bible Study: Wednesday, 6:00 PM - 7:30 PM",
        "No matter your availability, there’s always a chance to connect with God and the community. Come and worship with us!"
      ],
    },
    {
      id: 15,
      title: "What to Expect",
      paragraphs: [
        "At RCCG NewSpring Youth, you can expect an engaging worship experience with contemporary music and a practical, Bible-based message.",
        "We have a welcoming environment where people of all backgrounds can feel comfortable exploring their faith.",
        "Our youth programs are interactive and focus on spiritual growth, mentorship, and leadership development. We aim to inspire and equip you for life’s journey."
      ],
    },
    {
      id: 16,
      title: "Get Involved",
      paragraphs: [
        "There are plenty of opportunities to serve and grow at RCCG NewSpring Youth. Whether you’re passionate about music, media, outreach, or hospitality, we have a place for you to use your gifts.",
        "Join one of our small groups, participate in community events, or volunteer in our ministries to make meaningful connections and make an impact.",
        "Visit our welcome desk or contact us to learn more about how you can get involved."
      ],
    },
  ];
   
  return (
    <div className='service'>
       <Hero sections={sections} sectionType={sectionType}/>
       <ServiceTalk/>
    </div>
  )
}

export default Service