import {useEffect, useRef} from "react";
import { Link } from "react-router";
import "./resourceRec.css"

const Resourcerec = ({ resourceRecommendations }) => {
    const observer = useRef(null)

    useEffect(()=>{
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
       const elements =  document.querySelectorAll(".resrc_card")
       elements.forEach((el)=>observer.current.observe(el))
       return ()=>{
        elements.forEach((el)=>observer.current.unobserve(el))
       }
    },[])

  return (
    <div className="Resourcerec">
      <h2 className="title">Helpful resources</h2>
      <p className="title_small">
        Exploring self-worth and purpose through understanding one's identity as
        defined by biblical teachings.
      </p>
      
      <p className="studyTime">Our Bible study holds every tuesday and thursday from 06:00pm to 07:00pm</p>
      <div className="Resourcerec_container container_flex_around">
        {resourceRecommendations.map((resrc) => (
          <div className="resrc_card">
            <i className={`iconinactive ${resrc.icon}`}></i>
            <Link target="_blank" to={resrc.link}>{resrc.title}</Link>
         
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resourcerec;
