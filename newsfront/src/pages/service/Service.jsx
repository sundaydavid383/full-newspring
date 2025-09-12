import React, { useEffect } from 'react'
import "./service.css"

import Hero from '../../components/hero/Hero'
import ServiceTalk from '../../components/serviceTalk/ServiceTalk'

const Service = ({setActive}) => {
  useEffect(() => {
    setActive("service")
  }, [])
  
 
  const sectionType = ""
  const sections = [
  {
    id: 13,
    title: "Welcome to Our Services",
    paragraphs: [
      "Experience uplifting worship, inspiring messages, and a warm community at TIM412. Our services help you grow spiritually and connect with others in faith.",
      "Whether you're new or looking for a vibrant community, our doors are open to all.",
      "Join us this week to experience God’s presence and the joy of fellowship."
    ],
  },
  {
    id: 14,
    title: "Service Times",
    paragraphs: [
      "We offer service times to fit your schedule:",
      "- Sunday Morning: 8:00 AM - 10:30 AM",
      "- Youth Fellowship: 11:00 AM - 1:00 PM",
      "- Midweek Bible Study: Wednesday, 6:00 PM - 7:30 PM",
      "No matter your availability, there’s always a chance to connect with God. Come and worship with us!"
    ],
  },
  {
    id: 15,
    title: "What to Expect",
    paragraphs: [
      "Engaging worship with contemporary music and practical, Bible-based messages.",
      "A welcoming environment where everyone can explore faith comfortably.",
      "Interactive youth programs focusing on spiritual growth, mentorship, and leadership."
    ],
  },
  {
    id: 16,
    title: "Get Involved",
    paragraphs: [
      "Serve and grow at TIM412 through music, media, outreach, or hospitality.",
      "Join small groups, community events, or volunteer in ministries to make an impact.",
      "Visit our welcome desk or contact us to learn how you can get involved."
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