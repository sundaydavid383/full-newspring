import React, { useEffect, useRef } from 'react'
import  "./churchdetails.css";


const Churchdetails = ({churchCards}) => {
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
  {threshold: 0.1})
  const elements =document.querySelectorAll('.churchcard');
  elements.forEach((el)=> observer.current.observe(el));
  return ()=>{
    if(observer.current){
      elements.forEach((el)=> observer.current.unobserve(el))
    }
  }
  },[])
  

  return (
    <div className="Churchdetails">
    <h2 className="title">Who We Aspire to Be</h2>
    <div className="churchcard_container container_flex_between">
      {churchCards.map((card, index) => (
        <div key={index} className="churchcard">
          <div className="churchcard_image">
            <img src={card.image} alt={card.alt} />
          </div>
          <h3>{card.title}</h3>
          <p className="churchcard churchcardp">{card.description}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Churchdetails
