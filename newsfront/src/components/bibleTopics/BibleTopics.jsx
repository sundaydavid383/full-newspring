import {useEffect, useRef} from "react";
import "./bibletopic.css"
import { Link } from "react-router";


const BibleTopics = ({ title, smalltitle, topics }) => {
  const observer = useRef(null)

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
    },{threshold:0.2})

    const elements = document.querySelectorAll(".bible_topic_card")
    elements.forEach((el)=>observer.current.observe(el))
  
    return () => {
      elements.forEach((el)=>observer.current.unobserve(el))
    }
  }, [])
  
  return (
    <div className="BibleTopics">
      <h2 className="title">{title}</h2>
      <p className="title_small">{smalltitle}</p>

      <div className="bibletopic_container container_flex_around">
        {topics.map((topic) => (
          <div key={topic.id} className="bible_topic_card">
               <i className={topic.icon}></i>
               <h2>{topic.title}</h2>
               <span>{topic.keyVerse}</span>
               <p>{topic.description}</p>
               <Link target="_blank" to={`${topic.reference}`} className=" btn-slide"><p>Read More</p></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibleTopics;
