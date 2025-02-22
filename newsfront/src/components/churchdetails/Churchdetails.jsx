import React, { useEffect, useRef } from 'react'
import  "./churchdetails.css";
import prayer from "../../assets/rccg7.jpg"
import faith from "../../assets/rccg8.jpg"
import purpose from "../../assets/rccg9.jpg"

const Churchdetails = () => {
  const observer = useRef(null);
  useEffect(()=>{
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
    },
  {threshold: 0.2})
  const elements =document.querySelectorAll('.churchcard');
  elements.forEach((el)=> observer.current.observe(el));
  return ()=>{
    if(observer.current){
      elements.forEach((el)=> observer.current.unobserve(el))
    }
  }
  },[])
  return (
    <div className='Churchdetails '>
             <h2 className='title'>Who We Aspire to Be</h2>
        <div className="churchcard_container container_flex_between">
  <div className="churchcard ">
    <div className="churchcard_image">
      <img src={prayer} alt="Deep Prayer Life" />
    </div>

    <h3>Deep Prayer Life</h3>
    <p>
      Cultivate a habit of daily, intentional prayer to deepen your relationship with God. Prayer is not just a ritual but a meaningful conversation with the Creator, where you can seek His guidance, pour out your heart, and find the peace that surpasses all understanding. Let prayer anchor you in life’s storms and keep you aligned with God’s will.
    </p>
  </div>
  <div className="churchcard">
    <div className="churchcard_image">
      <img src={faith} alt="Bold Faith" />
    </div>

    <h3>Bold Faith</h3>
    <p>
      Faith is the courage to trust in God even when circumstances seem uncertain or challenging. Bold faith means standing firm in the truth of the Gospel, even in the face of opposition or doubt. It is living as a beacon of hope and love, being unashamed of your beliefs, and inspiring others to experience the transformative power of Christ’s message.
    </p>
  </div>
  <div className="churchcard">
    <div className="churchcard_image">
      <img src={purpose} alt="Pure and Purposeful Living" />
    </div>

    <h3>Pure and Purposeful Living</h3>
    <p>
      Purity is more than avoiding sin; it is a commitment to live a life that reflects God’s holiness in thoughts, words, and actions. Purposeful living involves aligning your goals and decisions with God’s plan for your life. By prioritizing spiritual growth, resisting worldly temptations, and pursuing Christ-centered ambitions, you can inspire others to see God’s love through your example.
    </p>
  </div>
</div>
    
  </div>
  )
}

export default Churchdetails
